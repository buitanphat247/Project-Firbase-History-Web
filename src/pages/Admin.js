import React from 'react';
import { Tabs } from 'antd';
import TabCategory from '../Components/TabCategory';
import TabCharacter from '../Components/TabCharacter';
import TabLocation from '../Components/TabLocation';
import TabGame from '../Components/TabGame';
import TabPost from '../Components/TabPost';
const Admin = () => {
    const items = [
        {
            key: '1',
            label: 'Quản lý thẻ nhân vật',
            children: <TabCharacter></TabCharacter>,
        },
        {
            key: '2',
            label: 'Quản lý thẻ di tích',
            children: <TabLocation></TabLocation>,
        },
        {
            key: '3',
            label: 'Quản lý game',
            children: <TabGame></TabGame>,
        },
        // {
        //     key: '4',
        //     label: 'Quản lý danh mục',
        //     children: <TabCategory></TabCategory>,
        // },
         {
            key: '55',
            label: 'Quản lý bài viết',
            children: <TabPost></TabPost>,
        },
    ];

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-4">Trang Quản Trị</h1>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
};

export default Admin;
