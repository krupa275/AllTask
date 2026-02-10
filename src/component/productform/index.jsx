import React from 'react'
import { useForm } from 'react-hook-form'
import { BASE_URL } from '../../constant'
import { useDispatch } from 'react-redux'
import { editFetchdata, setLoading } from '../../redux/productSlice'
import axios from 'axios'

const ProductForm = ({ data, onClose}) => {
      const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors }, watch, } = useForm({
        defaultValues: {
            title: data?.title || '',
            description: data?.description || '',
        }
    })
    const onSubmit = async (payload) => {
        dispatch(setLoading())

        try {
            const res = await axios.put(`${BASE_URL}/products/${data?.id}`,payload)
            console.log(res?.data)
            if (res) {
                dispatch(editFetchdata(res?.data))
                onClose()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Title</label>
                <input {...register("title", {
                    required: 'title is required',
                })} />
                {errors.title && <span>{errors.title.message}</span>}

                <br />

                <label>description</label>
                <input {...register("description", {
                    required: 'decription is required',
                })} />
                {errors.description && <span>{errors.description.message}</span>}
                <br />
                <button type="submit">Submit</button>

            </form>
        </div>
    )
}

export default ProductForm