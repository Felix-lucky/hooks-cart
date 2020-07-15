import React from 'react';
import './style.css';

export interface PropsItem {
  id: number,
  name: string,
  price: number,
  checked: boolean,
  onChangeChecked: any
}

const CratItem:React.FC<PropsItem> = ({id, name, price, checked, onChangeChecked}) => {
  const changeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    onChangeChecked(id, checked);
  }
  return (
    <li className='carts-content-item'>
      <div className='item-left'>
        <input checked={checked} onChange={changeCheckbox} type="checkbox" name={`checkbox${id}`} id={`checkbox${id}`}/>
        <label htmlFor={`checkbox${id}`}>{name}</label>
      </div>
      <div className='item-right'>${price}</div>
    </li>
  );
};

export default CratItem;