import React, { useState } from 'react';
import CartItem, { PropsItem } from './CartItem';
import './style.css';

const dataSource: any[] = [];
for(let i = 0; i < 30; i++) {
  dataSource.push({
    id: i,
    name: `商品${i}`,
    price: Math.round(Math.random() * 100),
  });
};

type CheckedMap = {
  [id: number]: boolean
}


const Carts = () => {
  const [checkedMap, setCheckedMap] = useState<CheckedMap>({});
  /**
   * 获取选择中
   * @param id 
   * @param checked 
   */
  const onChangeChecked = (id: number, checked: boolean): any => {
    const newCheckedMap = Object.assign({}, checkedMap, {
      [id]: checked
    });
    setCheckedMap(newCheckedMap);
  }
  /**
   * 过滤选中的数据
   */
  const filterChecked = () => {
    return Object.entries(checkedMap)
      .filter(entries => Boolean(entries[1]))
      .map(([checkedId]) => dataSource.find(({ id }) => id === Number(checkedId)));
  }
  /**
   * 选中数据求和
   * @param cartItems 
   */
  const sumPrice = (cartItems: any[]) => {
    return cartItems.reduce((sum, cur) => sum + cur.price, 0);
  }
  const calcPrice = () => {
    return sumPrice(filterChecked());
  }
  /**
   * 全选
   */
  const checkedAll = dataSource.length !==0 && filterChecked().length === dataSource.length;
  /**
   * 全不选
   * @param e 
   */
  const onChangeCheckedAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const newCheckedMap: CheckedMap = {};
    if(checked) {
      dataSource.forEach(item => {
        newCheckedMap[item.id] = true;
      });
    };
    setCheckedMap(newCheckedMap);
  }

  return (
    <div className='carts'>
      <header className='carts-header'>购物车</header>
      <ul className='carts-content'>
        {
          dataSource.map((item: PropsItem, index: number) => {
            const { id } = item;
            const checked = checkedMap[id] || false;
            return <CartItem key={index} checked={checked} {...item} onChangeChecked={onChangeChecked} />
          })
        }
      </ul>
      <footer className='carts-footer'>
        <div className='carts-footer-left'>
          <input type="checkbox" checked={checkedAll} onChange={onChangeCheckedAll} name="checkboxAll" id="checkboxAll"/>
          <label htmlFor="checkboxAll">全选</label>
        </div>
        <div className='carts-footer-right'>总计<span className='item-right'>${calcPrice()}</span></div>
      </footer>
    </div>
  );
}

export default Carts;