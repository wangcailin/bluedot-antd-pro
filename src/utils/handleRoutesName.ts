import { useIntl } from 'umi';

const handleRoutesName: any = (prefix: string, routes: any[]) => {
  return routes.map((item) => {
    const { children, ...currentitem } = item;
    const handelItem = {
      ...currentitem,
      name: useIntl().formatMessage({ id: `${prefix ? prefix + '.' + item.name : item.name}` }),
    };

    if (item.routes) {
      handelItem.routes = handleRoutesName(`${prefix}.${item.name}`, item.routes);
    }

    return handelItem;
  });
};

export default handleRoutesName;
