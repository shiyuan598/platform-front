import { useState, useEffect } from 'react';
import dataCenterStyle from './dataCenter.module.scss';
import Header from './header';
import Options from './options';
import Condition from './condition';
import List from './list';
import { ConditionContext } from "./context/index"
import { conditionType } from "./index.d"
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import {getSearchParams} from "./utils/urlTool";

function App() {
  const initial: conditionType = { date: null }
  const [condition, setCondition] = useState(initial);
  const addCondition = (data: { key: string, value: string | null }) => {
    const { key, value } = data;
    setCondition((condition) => {
      return {
        ...condition,
        [key]: value
      }
    }
    )
  }
  const removeCondition = (key: string) => {
    let obj: conditionType = {};
    Object.keys(condition as conditionType).forEach(item => {
      if (item !== key) {
        obj[item] = condition[item];
      }
    })
    setCondition(obj);
  }
  const clearCondition = () => {
    setCondition({})
  }

  useEffect(() => {
    let bagName = getSearchParams("bagName");
    let dir = getSearchParams("dir");
    if (bagName && !dir) {
      addCondition({
        key: "bagName",
        value: bagName + "/"
      });
    }
  }, []);
  
  return (
    <ConfigProvider locale={zhCN}>
      <ConditionContext.Provider value={{ condition, addCondition, removeCondition, clearCondition }} className={dataCenterStyle.container as any as string}>
        <Header></Header>
        <div className={dataCenterStyle.content}>
          <Options />
          <Condition />
          <List />
        </div>
      </ConditionContext.Provider>
    </ConfigProvider>
  );
}

export default App;
