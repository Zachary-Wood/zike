
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import './CreateAProduct.css'




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

  console.log(selectedSizes)

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

  

  const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("image", product_image);
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        await dispatch();
        history.push("/images");
  }
  
  
  
    return (
    <div className="create-new-prod-con">
        <h1>Add your product</h1>

        <form className="add-product-form" onSubmit={handleSubmit} encType="multipart/form-data">

        <div className="products-inputs-con">
        <label>
                Product Name
                <input
                type="text"
                name="name" 
                placeholder='Product name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
        </label>

        <label>
                Product Type
                <input
                type="select-field"
                name="type" 
                placeholder='Product type'
                value={type}
                onChange={(e) => setType(e.target.value)}
                />
        </label>

        <label>
                Product Price
                <input
                type="number"
                name="price" 
                placeholder='Product price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
        </label>

        <label>
                Product Description
                <input
                type="text-area"
                name="description" 
                placeholder='Product description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
        </label>

        <label>
                Gender
                <select
                type="select-field"
                name="gender" 
                placeholder='Product gender'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
        </label>

        <div className='button-box'>
        <div>
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

       

        <label>
                Clothing Type
                <select
                type="select-field"
                name="Clothing Type" 
                placeholder='Products clothing type'
                value={clothing_type}
                onChange={(e) => setClothing_type(e.target.value)}
                >
                <option value="Shoes">Shoes</option>
                <option value="Lifestyle Shoe">Lifestyle Shoe</option>
                <option value="Men's Trail Running Shoes">Men&apos;s Trail Running Shoes Size</option>
                <option value="Basketball Shoe">Basketball Shoe</option>
                <option value="Running Shoe">Running Shoe</option>
                <option value="Golf Shoe">Golf Shoe</option>
                </select>
        </label>
        
        <label>
            <p>Accepted formats: PDF, PNG, JPG, JPEG, GIF</p>
            Upload Image
        <input
              type="file"
              accept="image/*"
              onChange={(e) => setProduct_image(e.target.files[0])}
              />

        </label>

        
        <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}

    </div>
    
    </form>
        
    </div>
  )
}



export default CreateNewProduct
