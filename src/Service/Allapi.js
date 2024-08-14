import axiosInstance from "../config/axiosInstance";

export const getAllProductApi = async () => {
  try {
    const response = await axiosInstance.get("/products");
    // console.log(result);
    return response;
  } catch (error) {
    console.log(`facing error at getAll data from product api`, error);
    throw error;
  }
};

// post product data from ui

export const PostProductData = async (ProductData) => {
  try {
    const response = await axiosInstance.post("/products", ProductData);
    return response;
  } catch (error) {
    console.log(`facing error for post product data from ui`, error);
  }
};

// get Singal Data from api
export const GetSingleProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response;
  } catch (error) {
    console.error(
      `facing problem in getting data from product list api`,
      error
    );
  }
};
// DElete product details
export const DeleteProductDetails = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response;
  } catch (error) {
    console.error(`facing problem in delete data `, error);
  }
};

// get product List

export const NewProductList = async () => {
  try {
    const responce = await axiosInstance.get("/order/getNewOrder");
    // console.log(`getting data from api >>`, responce);
    return responce;
  } catch (error) {
    console.log(`facing error in getallProductData`, error);
    throw Error;
  }
};
// get product History
export const ProductHistory = async () => {
  try {
    const responce = await axiosInstance.get("/order/getAllorder");
    return responce;
  } catch (error) {
    console.error(`facing problem in getting ProductHistory`, error);
  }
};

// get  RecentOrder
export const RecentOrdersDetails = async () => {
  try {
    const responce = await axiosInstance.get("/order/getRecentOrder");
    //  console.log(responce,"responce data from api");

    return responce;
  } catch (error) {
    console.error(`facing problem in getting RecentOrder`, error);
  }
};
// get all user list
export const GetAllUserList = async () => {
  try {
    const responce = await axiosInstance.get("/userDetails/alluserDetails");
    //    console.log(`facing problem in all user responce `,responce);

    return responce;
  } catch (error) {
    console.error("facing error in get all userlist ", error);
  }
};
//delete orderlist 
export const DeleteOrderList = async (id) => {
  try {
    const responce = await axiosInstance.delete(
      `/order/deleteSingleItem/${id}`
    );
    console.log(responce, "responce data ");

    return responce;
  } catch (error) {
    console.error(
      "facing the problem in the getting data from deleteone",
      error
    );
  }
};
//view orderlist 

export const ViewOrderList=async(id)=>{
  try{
    const responce= await axiosInstance.get(`/order/getSingleOrder/${id}`)
    return responce 
  }catch(error)
  {
    console.error(`facing problem in viewOrderList from api `,error)
  }
}
