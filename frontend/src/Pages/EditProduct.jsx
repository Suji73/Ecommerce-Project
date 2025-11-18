import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../apis/productApi";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    existingImage: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);
        setFormData({
          name: product.name,
          price: product.price,
          description: product.description,
          image: null,
          existingImage: product.image, // this is the filename (e.g., "carrot.jpg")
        });
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await updateProduct(id, data);
      navigate("/products"); // Redirect to product list
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Price:</label>
          <input name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div>
          <label>Current Image:</label>
          {formData.existingImage && (
            <img
              src={`http://localhost:5000/uploads/${formData.existingImage}`}
              alt="Current"
              width="120"
            />
          )}
        </div>

        <div>
          <label>Change Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;