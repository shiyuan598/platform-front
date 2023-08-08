// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import {
  Map as LeafMap,
  TileLayer,
  Control,
  LatLngBounds,
  FeatureGroup,
  LayerGroup,
} from "leaflet";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLatest } from "react-use";

import { PanelExtensionContext, MessageEvent } from "@foxglove/studio";
import EmptyState from "@foxglove/studio-base/components/EmptyState";
import FilteredPointLayer from "@foxglove/studio-base/panels/Map/FilteredPointLayer";
import { Topic } from "@foxglove/studio-base/players/types";

import { ZhitoPoseMsg, Point } from "./types";

const COLOR_ACTIVE_FIX = "#ec1515";
const COLOR_ACTIVE_NO_FIX = "#5f0909";

// Persisted panel state
type Config = {
  zoomLevel?: number;
  disabledTopics?: [];
};

type MapPanelProps = {
  context: PanelExtensionContext;
};

function MapPanel(props: MapPanelProps): JSX.Element {
  const { context } = props;

  const mapContainerRef = useRef<HTMLDivElement>(ReactNull);

  const [config] = useState<Config>(props.context.initialState as Config);

  // Panel state management to update our set of messages
  // We use state to trigger a render on the panel
  const [navMessages, setNavMessages] = useState<readonly MessageEvent<ZhitoPoseMsg>[]>([]);
  const [allNavMessages, setAllNavMessages] = useState<readonly MessageEvent<ZhitoPoseMsg>[]>([]);

  // Panel state management to track the list of available topics
  const [topics, setTopics] = useState<readonly Topic[]>([]);

  // Disabled topics is the set of topics the user has unchecked in the layer control
  // Track disabled topics rather than enabled so any new topics display by default
  const [disabledTopics, _setDisabledTopics] = useState(
    () => new Set<string>(config.disabledTopics),
  );

  // Panel state management to track the current preview time
  const [, setPreviewTime] = useState<number | undefined>();

  const [currentMap, setCurrentMap] = useState<LeafMap | undefined>(undefined);

  // panel extensions must notify when they've completed rendering
  // onRender will setRenderDone to a done callback which we can invoke after we've rendered
  const [renderDone, setRenderDone] = useState<() => void>(() => () => { });

  const eligibleTopics = useMemo(() => {
    return topics
      .filter(
        (topic) => topic.proto === "zhito.localization.LocalizationEstimate")
      .map((topic) => topic.name);
  }, [topics]);

  // Subscribe to eligible and enabled topics
  useEffect(() => {
    const eligibleEnabled = eligibleTopics.filter((topic) => !disabledTopics.has(topic));
    context.subscribe(eligibleEnabled);
    return () => {
      context.unsubscribeAll();
    };
  }, [context, disabledTopics, eligibleTopics]);

  type TopicGroups = {
    topicGroup: LayerGroup;
    currentFrame: FeatureGroup;
    allFrames: FeatureGroup;
  };

  // topic layers is a map of topic -> two feature groups
  // A feature group for all messages markers, and a feature group for current frame markers
  const topicLayers = useMemo(() => {
    const topicLayerMap = new Map<string, TopicGroups>();
    for (const topic of eligibleTopics) {
      const allFrames = new FeatureGroup();
      const currentFrame = new FeatureGroup();
      const topicGroup = new LayerGroup([allFrames, currentFrame]);
      topicLayerMap.set(topic, {
        topicGroup,
        allFrames,
        currentFrame,
      });
    }
    return topicLayerMap;
  }, [eligibleTopics]);

  // layer controls for user selection between map, satellite and topics
  const layerControl = useMemo(() => new Control.Layers(), []);

  // toggling layers changes the disabledTopics list, but we don't want to re-run this effect
  // because the layer controls have already updated the map with active/inactive layers
  const disabledTopicsLatest = useLatest(disabledTopics);
  useLayoutEffect(() => {
    if (!currentMap) {
      return;
    }

    const topicLayerEntries = [...topicLayers.entries()];
    for (const entry of topicLayerEntries) {
      const topic = entry[0];
      const featureGroups = entry[1];
      layerControl.addOverlay(featureGroups.topicGroup, topic);

      // if the topic does not appear in the disabled topics list, add to map so it displays
      if (!disabledTopicsLatest.current.has(topic)) {
        currentMap.addLayer(featureGroups.topicGroup);
      }
    }

    return () => {
      for (const entry of topicLayerEntries) {
        const featureGroups = entry[1];

        layerControl.removeLayer(featureGroups.topicGroup);
        currentMap.removeLayer(featureGroups.topicGroup);
      }
    };
  }, [currentMap, disabledTopicsLatest, layerControl, topicLayers]);

  // During the initial mount we setup our context render handler
  useLayoutEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }
    const isDev = process.env?.NODE_ENV !== "production"
    const tileLayer = new TileLayer( isDev ? `http://${location.hostname}:8090/webrd00/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}`
        :`/webrd00/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}`, {
      subdomains: ["1", "2", "3", "4"],
    });

    //   L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    //     subdomains: ["1", "2", "3", "4"], //可用子域名，用于浏览器并发请求
    //     attribution: "&copy; 高德地图", //可以修改为其它内容
    // }).addTo(instance); //添加tile层到地图

    // const satelliteLayer = new TileLayer(
    //   `http://${host}:8090/webst04/appmaptile?style=6&x={x}&y={y}&z={z}`,
    //   {
    //     maxNativeZoom: 18,
    //     maxZoom: 24,
    //   },
    // );

    const map = new LeafMap(mapContainerRef.current, {
      // sets the tile layer as the default
      layers: [tileLayer],
    });

    // the map must be initialized with some view before other features work
    map.setView([0, 0], 10);
    setCurrentMap(map);

    // tell the context we care about updates on these fields
    context.watch("topics");
    context.watch("currentFrame");
    context.watch("allFrames");
    context.watch("previewTime");

    // The render event handler updates the state for our messages an triggers a component render
    //
    // The panel must call the _done_ function passed to render indicating the render completed.
    // The panel will not receive render calls until it calls done.
    context.onRender = (renderState, done) => {
      // console.log('onRender');

      setRenderDone(() => done);
      setPreviewTime(renderState.previewTime);

      if (renderState.topics) {
        setTopics(renderState.topics);
      }

      // if there is no current frame, we keep the last frame we've seen
      if (renderState.currentFrame && renderState.currentFrame.length > 0) {
        setNavMessages(renderState.currentFrame as readonly MessageEvent<ZhitoPoseMsg>[]);
      }

      if (renderState.allFrames) {
        setAllNavMessages(renderState.allFrames as readonly MessageEvent<ZhitoPoseMsg>[]);
      }
    };

    return () => {
      map.remove();
      context.onRender = undefined;
    };
  }, [context, layerControl]);

  /// --- the remaining code is unrelated to the extension api ----- ///

  const [center, setCenter] = useState<Point | undefined>();
  const [filterBounds] = useState<LatLngBounds | undefined>();

  // calculate center point from blocks if we don't have a center point
  useEffect(() => {
    // console.log('setCenter');

    setCenter((old) => {
      // set center only once
      if (old) {
        return old;
      }

      for (const messageEvent of allNavMessages) {
        const originX = messageEvent.message.pose?.position_llh?.lon ?? 0;
        const originY = messageEvent.message.pose?.position_llh?.lat ?? 0;
        const [lon, lat] = [originX * 180 / Math.PI, originY * 180 / Math.PI];
        const point: Point = {
          lat,
          lon,
        };

        return point;
      }

      for (const messageEvent of navMessages) {
        const originX = messageEvent.message.pose?.position_llh?.lon ?? 0;
        const originY = messageEvent.message.pose?.position_llh?.lat ?? 0;
        const [lon, lat] = [originX * 180 / Math.PI, originY * 180 / Math.PI];
        const point: Point = {
          lat,
          lon,
        };

        return point;
      }

      return;
    });
  }, [allNavMessages, navMessages]);

  // create a filtered marker layer for the current nav messages
  // this effect is added after the allNavMessages so the layer appears above
  useEffect(() => {
    if (!currentMap) {
      return;
    }
    // Group messages by topic to render into layers by topic
    const byTopic = new Map<string, MessageEvent<ZhitoPoseMsg>[]>();
    for (const msgEvent of navMessages) {
      const msgEvents = byTopic.get(msgEvent.topic) ?? [];
      msgEvents.push(msgEvent);
      byTopic.set(msgEvent.topic, msgEvents);
    }

    for (const [topic, events] of byTopic) {
      const topicLayer = topicLayers.get(topic);
      if (!topicLayer) {
        // If we get a message for a topic we did not subscribe to - something bad has happened.
        // We'll pretend like it didn't happen and move along.
        continue;
      }

      // const hasFix = (ev: MessageEvent<ZhitoPoseMsg>) => true;
      const hasFix = () => true;
      const noFixEvents = events.filter(() => !hasFix());
      const fixEvents = events.filter(hasFix);

      const pointLayerNoFix = FilteredPointLayer({
        map: currentMap,
        navSatMessageEvents: noFixEvents,
        bounds: filterBounds ?? currentMap.getBounds(),
        color: COLOR_ACTIVE_NO_FIX,
        showAccuracy: true,
      });
      const pointLayerFix = FilteredPointLayer({
        map: currentMap,
        navSatMessageEvents: fixEvents,
        bounds: filterBounds ?? currentMap.getBounds(),
        color: COLOR_ACTIVE_FIX,
        showAccuracy: true,
      });

      // clear any previous layers to only display the current frame
      topicLayer.currentFrame.clearLayers();
      topicLayer.currentFrame.addLayer(pointLayerNoFix);
      topicLayer.currentFrame.addLayer(pointLayerFix);
    }
  }, [currentMap, filterBounds, navMessages, topicLayers]);

  // Indicate render is complete - the effect runs after the dom is updated
  useEffect(() => {
    // console.log('renderDone');

    renderDone();
  }, [renderDone]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {!center && <EmptyState>Waiting for first GPS point...</EmptyState>}
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%", visibility: center ? "visible" : "hidden" }}
      />
    </div>
  );
}

export default MapPanel;
