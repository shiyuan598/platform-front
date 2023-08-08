import React, { Fragment, useState, useEffect, useContext } from 'react';
import { RouteContext } from '../context/RouteContext';
import '../style/route.scss';

const routes = [{
    id: "01",
    title: "青龙港58号-新城菜场",
    lineData: {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [[120.642573, 31.420291], [120.643687, 31.426207], [120.651349, 31.42469], [120.651349, 31.42469], [120.65717, 31.420068], [120.672945, 31.413226], [120.678622, 31.40922], [120.672801, 31.410329], [120.685449, 31.408172], [120.684695, 31.406878]]
        },
        "properties": {
            "title": "青龙港58号-新城菜场",
        },
    }
}, {
    id: "02",
    title: "天成时代商务广场-苏州大学实验学校",
    lineData: {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [[120.648942, 31.421886], [120.663117,31.413434]]
        },
        "properties": {
            "title": "天成时代商务广场-苏州大学实验学校",
        },
    }
}, {
    id: "03",
    title: "高铁北站-富元路",
    lineData: {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [[120.650855, 31.425522], [120.631973, 31.40714]]
        },
        "properties": {
            "title": "高铁北站-富元路",
        },
    }
}, {
    id: "04",
    title: "中泱天成-大湾",
    lineData: {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [[120.655922, 31.41657], [120.639339, 31.421531]]
        },
        "properties": {
            "title": "中泱天成-大湾",
        },
    }
}, {
    id: "05",
    title: "水景路-观天下花苑",
    lineData: {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [[120.643867, 31.426292], [120.657467, 31.418511]]
        },
        "properties": {
            "title": "水景路-观天下花苑",
        },
    }
}];

export default function Route() {
    const [curRoute, setCurRoute] = useState(routes[0]);
    const [panelVisible, setPanelVisible] = useState(false);
    const {setRoute} = useContext(RouteContext);
    useEffect(() => {
        setRoute(curRoute);
    }, [curRoute]);

    const handleRouteClick = (route) => {
        setCurRoute(route);
    }
    return (
        <Fragment>
            <div className='route-container'>
                <ul className={panelVisible ? "show" : "hide"} >
                    {routes.map(item => {
                        return (<li key={item.id} className={item.id === curRoute.id ? "active" : ""} onClick={() => handleRouteClick(item)}>
                            <span>{item.title}</span>
                        </li>)
                    })}
                </ul>
                <div className={(panelVisible ? "open" : "") + " switch-btn"} onClick={() => { setPanelVisible(!panelVisible) }}>选择路线<span className='icon'></span></div>
            </div>
        </Fragment>
    )
}
