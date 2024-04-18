'use client'
import React from "react";
import Pages from "../Posts/Posts";
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import AddProduct from "../../app/addproduct/page"
const Admin = () => {
    return (
        <div className="flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs">
       
          <Tab title="Мэдээ">
            <Card>
              <CardBody>
              <div className="flex flex-col justify-center items-center pt-[50px]">
            <h3 className="w-[80%]">Мэдээ</h3>
            <div className="w-full max-w-[80vw]">
                <Pages />
            </div>
            </div>
              </CardBody>
            </Card>  
          </Tab>
 
          <Tab title="Мэдээ оруулах">
            <Card>
              <CardBody>
                <AddProduct/>
              </CardBody>
            </Card>  
          </Tab>
      </Tabs>
    </div>  
    );
}

export default Admin;
