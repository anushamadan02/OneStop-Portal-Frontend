import axios from 'axios';
import base from '../config/systemconfig'
const API=axios.create({baseURL:base.url})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile'))
    {
       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
       req.mode="no-cors"
      }
    console.log("front End api req:",req)
   return req;
})
//Products CRUD
export const search = (searchterm) => API.get("/search",{params:{q:searchterm}});
export const fetchProducts = () => API.get('/products');
export const fetchProductbyid = (prodid) => API.get(`/product/${prodid}`);
export const deleteProduct = (id,userid) => API.delete(`/product/${id}/${userid}`);
export const searchproduct = (searchterm) => API.get("/searchproduct",{params:{q:searchterm}});
export const bulkupload=(data,userid)=>API.post(`/bulkupload/${userid}`,{data:data})
export const getproductphoto=(prodid)=>API.get(`product/photo/${prodid}`)

export const updateProduct = (id,updatedprod) => axios({
   method:"put",
   url:`${base.url}/product/${id}/${JSON.parse(localStorage.getItem('profile')).user._id}`,
   data:updatedprod,
   headers: { "Content-Type": "multipart/form-data","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 });
export const createProduct = (newprod,id) => axios({
                    method:"post",
                    url:`${base.url}/product/create/${id}`,
                    data:newprod,
                    headers: { "Content-Type": "multipart/form-data" ,"Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
                  });

//Orders
export const createOrder=(cardid,userid,order)=>API.post(`/order/create/${cardid}/${userid}`,order)
export const fetchUserOrders=(userid)=>API.get(`/orders/user/${userid}`)

//user Cards
export const getusercards=(userid)=>API.get(`/paymentcards/${userid}`);

//auth
export const signUp=()=>API.get('/auth/google');
//export const signin=()=>API.get('/auth/google');
//mobileplansandbroadband
export const fetchPosts = () => API.get("/posts");
export const fetchdataconsump = () => API.get("/datas");
export const fetchplanscart = () => API.get("/plans");
export const getblocations = () => API.get("/broadbandlocation");
export const fetchbroadband = () => API.get("/broadband");
export const fetchusers = () =>  API.get("/users");
//cards
export const getcards= (userid) =>  API.get(`/paymentcards/${userid}`);
export const createCard = (userid, pcard) => axios({
  method:"post",
  url:`${base.url}/paymentcards/${userid}`,
  data:pcard,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});

//broadband
export const broadbandpay = (paydetails, broadbandid, cardid, userid) => axios({
  method:"post",
  url:`${base.url}/buynewbroadband/${broadbandid}/${cardid}/${userid}`,
  data:paydetails,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});

export const mobileplanpay= (paydetails, postid, cardid, userid) => axios({
  method:"post",
  url:`${base.url}/plan/create/${postid}/${cardid}/${userid}`,
  data:paydetails,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});

export const deletePost = (userid, id) =>  axios({
  method:"delete",
  url:`${base.url}/post/${id}/${userid}`,
  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
});

export const deletebroadband = (user, broadbandid) =>  axios({
  method:"delete",
  url:`${base.url}/deletebroadplan/${broadbandid}/${user}`,
  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
});


export const createBPlan = (userid, bpost) => axios({
   method:"post",
   url:`${base.url}/addbroadband/${userid}`,
   data:bpost,
   headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
  
 });
 
 export const createPost = (userid, newPost) => axios({
   method:"post",
   url:`${base.url}/post/create/${userid}`,
   data:newPost,
   headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`},
   
 });

 export const updatePost = (id, userid, post) => axios({
  method:"put",
  url:`${base.url}/post/${userid}/${id}`,
  data:post,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});
export const updatebroadband = (id, userid, bpost) => axios({
  method:"put",
  url: `${base.url}/updateBroadbandPlan/${userid}/${id}`,
  data:bpost,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});

export const upgradeBroadbandPlan = (details, cardid, userid) => axios({
  method:"post",
  url:`${base.url}/renewupgradebroadband/${cardid}/${userid}`,
  data:details,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`},
  
});

export const getCurrentBroadbandPlan=(userid) => axios({
  method:"get",
  url:`${base.url}/broadband/user/${userid}`,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});

export const getbroadbandhistory=(userid) => axios({
  method:"get",
  url:`${base.url}/broadbandpayhis/user/${userid}`,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});

export const getplanbyid=(userid) => axios({
  method:"get",
  url:`${base.url}/plan/user/${userid}`,
  headers: { "Content-Type": "application/json","Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`}
 
});

export const signIn=()=>API.get('/profile');
export const addtocart = (newPlan) => axios.post("/plan/create",newPlan);


export const getProfile=()=>axios({
   method:"get",
   url:'h${base.url}/profile',
   header:{"Access-Control":"Allow-Origin"}
});
export const login=()=>API.get('/profile')
export const googlesignIn=(user)=>API.post('/googlesignin',user)
//USER CART

export const addproducttocart=(userid,prod)=>API.post(`/addtocart/${userid}`,prod)
export const deletefromcart=(userid,id)=>API.post(`/deletefromcart/${userid}`,{id:id})
export const updatecart=(userid,prod)=>API.post(`/updateproductoncart/${userid}`,prod)
export const getcart=(userid)=>API.get(`/cart/${userid}`)
export const emptyCart=(userid)=>API.get(`/emptycart/${userid}`)

//likes and review
export const likeproduct=(userid,prodid,body)=>API.post(`/likeproduct/${userid}/${prodid}`,body)
export const addreview=(userid,prodid,body)=>API.post(`/review/${userid}/${prodid}`,body)
export const updatereview=(userid,prodid,body)=>API.patch(`/review/${userid}/${prodid}`,body)
export const deletereview=(userid,prodid,body)=>API.delete(`/review/${userid}/${prodid}`,body)

//other userprofile
export const fetchuser=(userid)=>API.get(`/user/${userid}`)
export const updateuser=(userid,body)=>API.put(`/user/${userid}`,body)