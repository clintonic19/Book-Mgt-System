/* eslint-disable react/jsx-key */
import { useState } from "react"
import BookCards from "../books/BookCards";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from "../../redux/slice/booksApi/bookApiSlice";

const categories =[ "Select Category", "Fiction", "Horror", "Adventure", "Biography", "History", ]

const TopSales = () => {
    // const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Select Category");

    // Fetching the books data from the json file
    // useEffect(() => {
    //     const fetchBooks = async () => {
    //         const response = await fetch("/demoData/books.json")
    //         const data = await response.json()
    //         setBooks(data)
    //     }
    //     fetchBooks()
    // }, []);

    // Fetching the books data from the DATABASE
    const { data: books= []  } = useFetchAllBooksQuery();
    console.log(books);
    

  // Filter the books based on the selected category
    const filteredBook = selectedCategory === "Select Category" ? books :  books?.data?.filter(book => book?.category === selectedCategory?.toLowerCase());
    
  return (
    <>
      <div className="py-12 ">
      <h2 className="md:text-4xl text-2xl font-semibold mb-5"> Top Selling Books  </h2>
      
      {/* filter Category of Seller */}
        <div className="mb-8 flex items-center gap-4">
            <select 
            onChange={(e)=> setSelectedCategory(e?.target?.value)}
            name="category" id="category" 
            className="bg-[#EAEAEA] py-2 px-4 rounded-md focus:outline-none">
                {
                    categories?.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))
                }
            </select>
        </div>

        {/* SWIPPER HERE... */}
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation = {true}
        
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },

          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },

        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
            {
              // filteredBook.length > 0 && filteredBook.map((book, index) => (
              //   <SwiperSlide key={index} >
              //       <BookCards book={book}/>
              //   </SwiperSlide>
              //   ))
                filteredBook?.data?.length > 0 && filteredBook?.data?.map((book, index) => (
                    <SwiperSlide key={index} >
                        <BookCards book={book}/>
                    </SwiperSlide>
                    
                ))
            }
      </Swiper>

            </div>
    </>
  )
}

export default TopSales
