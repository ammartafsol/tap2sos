"use client";

import Button from "@/component/atoms/Button";
import DropDown from "@/component/molecules/DropDown/DropDown";
import AppTable from "@/component/organisms/AppTable/AppTable";
import {
  clinicTableData,
  clinicTableData2,
} from "@/developmentContent/tableBody";
import { ClinicTableHeader } from "@/developmentContent/tableHeader";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import classes from "./ClinicManagement.module.css";
import AddClinicModal from "@/component/molecules/Modal/AddClinicModal";
import { Input } from "@/component/atoms/Input";
import { IoSearchOutline } from "react-icons/io5";
import useDebounce from "@/resources/hooks/useDebounce";
import { RECORDS_LIMIT } from "@/const";
import { Get } from "@/interceptor/axios-functions";
import moment from "moment";


const ClinicManagement = () => {
  const [show, setShow] = useState(false);
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState('');
  const [search,setSearch] = useState('');
  const [page,setPage] = useState(1);
  const [totalRecords,setTotalRecords] = useState(0);
  const debouceSearch = useDebounce(search,500);  
  const getData = async (p=page)=>{
    setLoading('loading');
    const query = {
      page: p ,
      limit: RECORDS_LIMIT,
      search: debouceSearch,
    }
    const queryString = new URLSearchParams(query).toString().replace(/\+/g, '%20');
    const response = await Get({route:`admin/users/all?${queryString}`});
    setLoading('');
    if(response.status === 200){
      setData(response?.data?.data);
      setTotalRecords(response?.data?.totalRecords);
    }
  }

  useEffect(()=>{
    getData();
  },[debouceSearch]);





  return (
    <>
      <div className={'main'}>
        <div className={classes?.user}>
          <div className="h1">Clinic Management</div>
          <div className={classes?.rightTop}>
            <Input placeholder={"Search"} setter={setSearch} inputBoxStyle={classes?.boxStyle} mainContClassName={classes?.mainContClassName}  type={"search"} leftIcon={<IoSearchOutline size={24} />}  />
            {/* <DropDown containerClass={classes?.DropDownContainer} placeholder={"Filter"} options={[]} /> */}
            <Button
              leftIcon={<IoAdd fontSize={22} />}
              className={classes?.btn}
              label={"Add Clinic"}
              onClick={setShow}
            />
          </div>
        </div>
        <div className={classes?.userTable}>User</div>
        <AppTable
          containerClass={classes?.containerClass}
          tableHeader={ClinicTableHeader}
          data={data}
          loading={loading==='loading'}
          totalRecords={totalRecords}
          setCurrentPage={(p)=>{setPage(p);getData(p)}}
          currentPage={page}
          renderItem={({ item, key, rowIndex }) => {
            const dataItem = data[rowIndex];
            if (key === "select") {
              return <BsThreeDotsVertical fontSize={18} cursor={"pointer"} />;
            }
            if(key === 'date'){
              return(
                <div>{moment(dataItem?.createdAt).format('YYYY/MM/DD')}</div>
              )
            }

            return item || "";
          }}
        />
      </div>
      {show && <AddClinicModal show={show} setSearch={setSearch} setShow={setShow} getData={getData}  />}
    </>
  );
};

export default ClinicManagement;

