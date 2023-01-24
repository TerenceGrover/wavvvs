import React from 'react';
import { HomeContext } from '../Utils/Context';


export default function SideBarButton(props: { icon: JSX.Element, text: string }) {

  const { setCentralHome } = React.useContext(HomeContext);

  return (
    <div className='flex flex-col text-neutral-200 items-center'>
        <button onClick={() => setCentralHome(props.text)}>
          {props.icon}
        </button>
        <span>{props.text}</span>
    </div>
  );
}