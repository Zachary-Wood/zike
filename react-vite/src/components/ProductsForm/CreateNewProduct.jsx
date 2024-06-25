
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import './CreateAProduct.css'
import { createAProductThunk} from '../../redux/products'
import LoadingModal from '../Loading/Loading'




const CreateNewProduct = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showImage, setShowImage] = useState()
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
  const [fileName, setFileName] = useState('');

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
    if (selectedSizes.length < 3) errorsObj.selectedSizes = 'Please provide at least 3 shoe sizes'
    if (!clothing_type) errorsObj.clothing_type = "Please fill out products clothing type"
    if (!product_image) errorsObj.product_image = "Please provide an image"
    if (product_image && product_image.name && !product_image.name.endsWith('.png') && !product_image.name.endsWith('.jpg') && !product_image.name.endsWith('.jpeg'))  errorsObj.product_image = 'Uploaded file must end with .png, .jpg, .jpeg'
    
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
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setProduct_image(file);  
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setShowImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
};

  // console.log('prod', product_image.name)
  
  const handleSubmit = async (e) => {
        e.preventDefault()
        setImageLoading(true);


        await new Promise(resolve => {
          const intervalId = setInterval(() => {
              if (product_image !== '') {
                  clearInterval(intervalId);
                  resolve();
              }
          }, 100); 
      });
        const formData = new FormData();

        // console.log('prod',product_image, name, type, price, description, gender, sizeString, clothing_type);
        formData.append("name", name)
        formData.append("type", type)
        formData.append("price", price)
        formData.append("description", description)
        formData.append("gender", gender)
        formData.append("size", sizeString)
        formData.append("clothing_type", clothing_type)
        formData.append("product_image", product_image);



        // console.log(formData)



        
        
        try {
          const newProduct = await dispatch(createAProductThunk(formData));
          if (newProduct) {
            navigate(`/products/${newProduct.id}`);
          }
          setImageLoading(false);
        } catch (error) {
          console.error('Failed to create product', error);
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
                <option value="Slides">Slides</option>
                <option value="Lifestyle Shoe">Lifestyle Shoe</option>
                <option value="Trail Running Shoes">Trail Running Shoes</option>
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
        <p className='desc-label'>Product Description</p>
        <input
            name="description"
            type='text-area'
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
        <p className='desc-label'>Gender</p>
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

      {errors.selectedSizes && <p className='form-errors'>{errors.selectedSizes}</p>}

       

        <label>
        <div className='input-con'>
        <p className='desc-label'>Clothing Type</p>
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
        
        
          <div className='image-submit-con'>
            <p className='accepted'>Accepted formats: PNG, JPG, JPEG</p>
            <div className="input-container">
            <label htmlFor="post-image-input" className="input-label">
            Select Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="input-image"
                    id="post-image-input"
                    />
            </label>
          </div>
        </div>

        <div className="image-preview-div">
          {fileName && <p className='filename'>Selected File: {fileName}</p>}
          {showImage && <img src={showImage} className='preview-image' alt="Preview" />}
        </div>
        {errors.product_image && <p className='form-errors'>{errors.product_image}</p>}

        <div className='btn-con-prod-create'>
        <button className='product-submit-btn' type="submit" disabled={Object.values(errors).length > 0}>Submit</button>


        </div>

    </div>
    
    </form>
        
    </div>
  )
}



export default CreateNewProduct
