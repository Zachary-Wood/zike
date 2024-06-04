
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import './CreateAProduct.css'
import { createAProductThunk } from '../../redux/products'
import LoadingModal from '../Loading/Loading'




const CreateNewProduct = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [imageLoading, setImageLoading] = useState(false);
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [gender, setGender] = useState('')
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [clothing_type, setClothing_type] = useState('')
  const [product_image, setProduct_image] = useState('')
  const [errors, setErrors] = useState({})
  
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    if(!currentUser) navigate("/")
  
  }, [navigate,currentUser])

  useEffect(() => {
    const errorsObj = {}

    if (name.length < 3 || name.length > 50) errorsObj.name = 'Please provide a valid name between 3 and 50 characters'
    if (!type) errorsObj.type = 'Please select a product type'
    if (price < 1 || price > 500) errorsObj.price = 'Price must be between 1 and 500'
    if(description.length < 10 || description.length > 255) errorsObj.description = 'Please provide a valid description between 10 and 255 characters'
    if (!gender) errorsObj.gender = "Please fill out the gender"
    if (!selectedSizes) errorsObj.selectedSizes = "Please fill out all wanted sizes"
    if (!clothing_type) errorsObj.clothing_type = "Please fill out products clothing type"
    if (!product_image) errorsObj.product_image = "Please provide an image"

    setErrors(errorsObj)

  }, [name, type, price, description, gender, selectedSizes, clothing_type, product_image])


  const sizes = [
    { label: '6', value: '6' },
    { label: '6.5', value: '6.5' },
    { label: '7', value: '7' },
    { label: '7.5', value: '7.5' },
    { label: '8', value: '8' },
    { label: '8.5', value: '8.5' },
    { label: '9', value: '9' },
    { label: '9.5', value: '9.5' },
    { label: '10', value: '10' },
    { label: '10.5', value: '10.5' },
    { label: '11', value: '11' },
    { label: '11.5', value: '11.5' },
    { label: '12', value: '12' },
    { label: '12.5', value: '12.5' },
    { label: '13', value: '13' },
    { label: '14', value: '14' }
  ];

  

  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    setSelectedSizes(checked ? sizes.map(size => size.value) : []);
  };

  const handleSizeChange = (event) => {
    const value = event.target.value;
    setSelectedSizes(prevSelectedSizes =>
      prevSelectedSizes.includes(value)
        ? prevSelectedSizes.filter(size => size !== value)
        : [...prevSelectedSizes, value]
    );
  };
  const sizeString = selectedSizes.join(', ')
  console.log(sizeString)
  

  const handleSubmit = async (e) => {
        e.preventDefault()
        setImageLoading(true);



        const formData = new FormData();
        formData.append("name", name)
        formData.append("type", type)
        formData.append("price", price)
        formData.append("description", description)
        formData.append("gender", gender)
        formData.append("size", sizeString)
        formData.append("clothing_type", clothing_type)
        formData.append("product_image", product_image);


        
        try {
          const newProduct = await dispatch(createAProductThunk(formData));
          navigate(`/products/${newProduct.id}`);
        } catch (error) {
          console.error('Failed to create product', error);
        } finally {
          setImageLoading(false);
        }
      };
       
  
  
  
return (
    <div className="create-new-prod-con">
       {imageLoading && <LoadingModal />}
        <h1 className='add-your-product'>Add your product</h1>
        <p className='enter-all'>Enter all the info for your product!</p>

        <form className="add-product-form" onSubmit={handleSubmit} encType="multipart/form-data">

        <div className="products-inputs-con">
        <label>
        <div className='input-con'>
                Product Name
                <input
                type="text"
                name="name" 
                placeholder='Product name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='inputs'
                />
                </div>
        </label>
        {errors.name && <p className='form-errors'>{errors.name}</p>}

        <label>
        <div className='input-con'>
                Type
                <select
                type="select-field"
                name="Clothing Type" 
                placeholder='Products clothing type'
                value={type}
                onChange={(e) => setType(e.target.value)}
                className='clothing-con'
                >
                <option value="" disabled>Select Type</option>
                <option value="Shoes">Shoes</option>
                <option value="Lifestyle Shoe">Lifestyle Shoe</option>
                <option value="Trail Running Shoes">Trail Running Shoes Size</option>
                <option value="Basketball Shoe">Basketball Shoe</option>
                <option value="Running Shoe">Running Shoe</option>
                <option value="Golf Shoe">Golf Shoe</option>
                </select>
                </div>
        </label>
        {errors.type && <p className='form-errors'>{errors.type}</p>}

        <label>
        <div className='input-con'>
                Product Price
                <input
                type="number"
                name="price" 
                placeholder='Product price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='inputs'
                />
                </div>
        </label>
        {errors.price && <p className='form-errors'>{errors.price}</p>}

        <div className='input-con'>
    <label className='prod-desc'>
        Product Description
        <textarea
            name="description"
            placeholder='Product description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='product-description'
        />
    </label>
    {errors.description && <p className='form-errors'>{errors.description}</p>}
</div>

        <label>
        <div className='input-con-gender'>
                Gender
                <select
                type="select-field"
                name="gender" 
                placeholder='Product gender'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
        </div>
        </label>
        {errors.gender && <p className='form-errors'>{errors.gender}</p>}

        <div className='button-box'>
        <div className='select-all'>
        <input
          type="checkbox"
          id="selectAll"
          checked={selectAll}
          onChange={handleSelectAllChange}
        />
        <label htmlFor="selectAll">Select All</label>
      </div>
      {sizes.map(size => (
        <div key={size.value} className='boxes'>
          <input
            type="checkbox"
            id={size.value}
            value={size.value}
            checked={selectedSizes.includes(size.value)}
            onChange={handleSizeChange}
          />
          <label htmlFor={size.value}>{size.label}</label>
        </div>
      ))}
      </div>

      {errors.size && <p className='form-errors'>{errors.size}</p>}

       

        <label>
        <div className='input-con'>
                Clothing Type
                <select
                type="select-field"
                name="Clothing Type" 
                placeholder='Products clothing type'
                value={clothing_type}
                onChange={(e) => setClothing_type(e.target.value)}
                className='clothing-con'
                >
                <option value="" disabled>Select Clothing Type</option>
                <option value="Shoes">Shoes</option>
                <option value="Sportswear">Sportswear</option>
                <option value="Shorts">Shorts</option>
                <option value="T-Shirts">T-Shirts</option>
                </select>
                </div>
        </label>
        {errors.clothing_type && <p className='form-errors'>{errors.clothing_type}</p>}
        
        <label>
            <p>Accepted formats: PDF, PNG, JPG, JPEG, GIF</p>
            Upload Image
        <input
              type="file"
              accept="image/*"
              onChange={(e) => setProduct_image(e.target.files[0])}
              />

        </label>
        {errors.product_image && <p className='form-errors'>{errors.product_image}</p>}

        <div className='btn-con-prod'>
        <button className='product-submit-btn' type="submit" disabled={Object.values(errors).length > 0}>Submit</button>


        </div>

    </div>
    
    </form>
        
    </div>
  )
}



export default CreateNewProduct
