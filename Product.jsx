import React, { useEffect, useState } from 'react'
import Header from './src/Header'
import axios from 'axios'
import { useDispatch, useSelector, } from 'react-redux'
import { deleteFetchdata, setLoading, setLoaingSuccess, setProductData } from './src/redux/productSlice'
import { BASE_URL } from './src/constant'
import Modal from './src/component/model'
import ProductForm from './src/component/productform'

const Product = () => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { list, loading, error } = useSelector(
    (state) => state.product
  );
  // console.log(list)
  const fetchData = async () => {
    dispatch(setLoading())
    try {
      const res = await axios.get(`${BASE_URL}/products`)
      //  console.log(res) 
      dispatch(setProductData(res?.data?.products))
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <h2>Loading...</h2>;

  const DeleteData = async (id) => {
    dispatch(setLoading())

    try {
      const res = await axios.delete(`${BASE_URL}/products/${id}`)
      if (res) {
        dispatch(deleteFetchdata(id))
      }
    } catch (error) {

    }
  }
  const EditData = (data) => {
    setEditData(data)
    openModal()
    // dispatch(setLoading())

    // try {
    //   const res = await axios.put(`${BASE_URL}/products/${id}`)
    //   if (res) {
    //     dispatch(editFetchdata(id))
    //   }
    // } catch (error) {

    // }
  }
  const searchdata = ()=>{
    if(!search){
      return list
    }
    return list.filter(l=>l?.title?.toLowerCase().includes(search?.toLowerCase()))
  }
  return (
    <>
      <Header />
      <input className='border' name='search' onChange={(e) => setSearch(e.target.value)} />
      <div className='grid grid-cols-3 gap-4'>
        {searchdata()?.map((val) => {
          return (
            <>

              <div className="w-[400px] h-[400px] rounded overflow-hidden shadow-lg" key={val?.id}>
                <img className="w-[400px] h-[150px]" src={val?.images} alt="Mountain" />
                <div className="px-4 py-4">
                  <div className="font-bold text-xl mb-2">{val?.title}</div>
                  <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  </p>
                  <h6>title:{val.price}</h6>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <button onClick={() => DeleteData(val?.id)} className='cursor-poniter inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>Delete</button>
                  <button onClick={() => EditData(val)} className='cursor-pointer  inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>Edit</button>
                </div>
              </div>
            </>
          )
        })}

      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ProductForm data={editData} onClose={closeModal} />
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  )
}

export default Product