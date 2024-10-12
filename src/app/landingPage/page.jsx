"use client";
import React, { useEffect, useState } from 'react';
import {
  Img,
  Text,
  Heading,
  Button,
  CheckBox,
  SelectBox,
} from "../../components";
import Image from "next/image"; // Ensure to import Image from next/image
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
  AccordionItemPanel,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
  Accordion,
  AccordionItem,
} from "react-accessible-accordion";

import { fetchProducts } from './api';

export default function WebPLPWithFilterPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Add state for filter visibility

  const dropDownOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'priceLowToHigh', label: 'Price: Low to High' },
    { value: 'priceHighToLow', label: 'Price: High to Low' },
    { value: 'newestArrivals', label: 'Newest Arrivals' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        console.log(fetchedProducts); // Log the fetched products for debugging
        setProducts(fetchedProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterClick = () => {
    setIsFilterVisible((prev) => !prev); // Toggle filter visibility
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full flex-col items-center gap-[58px] bg-white-A700 sm:gap-[29px]">
      {/* Header Section */}
      <Header className="self-stretch" />

      {/* Hero Section */}
      <div className="container-xs md:p-5">
        <div className="flex flex-col items-center gap-[72px] md:gap-[54px] sm:gap-9">
          <div className="flex w-[58%] flex-col items-center gap-[19px] md:w-full">
            <Text
              size="2xl"
              as="p"
              className="text-center uppercase tracking-[1.00px] !text-gray-900"
            >
              DISCOVER OUR PRODUCTS
            </Text>
            <Text
              size="xl"
              as="p"
              className="w-full text-center leading-10 !text-gray-900"
            >
              Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
              scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
              dolor.
            </Text>
          </div>
          <div className="flex flex-col gap-8 self-stretch">
            <div className="flex items-start justify-between gap-5 border-b-[0.5px] border-solid border-gray-300 bg-white-A700 py-6 pr-6 sm:flex-col sm:py-5 sm:pr-5">
              <div className="flex w-[25%] items-start justify-between gap-5 sm:w-full">
                <Heading as="h1" className="mt-[7px] uppercase">
                  {products.length} Items
                </Heading>

                
                {/* Filter Section */}
                <div className="relative h-[40px] w-[43%]">
                    <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-full bg-white-A700 py-3">
                      <Img
                        src="img_arrow_left.svg"
                        width={16}
                        height={16}
                        alt="arrowleft"
                        className="h-[16px] w-[16px]"
                      />
                    </div>
                    <Text
                      size="md"
                      as="p"
                      className="absolute right-[0.00px] top-[9.25px] m-auto text-right !font-adobecaslonpro underline cursor-pointer"
                      onClick={handleFilterClick}
                    >
                      {isFilterVisible ? "HIDE FILTER" : "SHOW FILTER"}
                    </Text>
                  </div>
                </div>
              <SelectBox
                menuPortalTarget={document.getElementById("menuPortalTarget")}
                shape="square"
                name="recommended"
                placeholder="Recommended"
                options={dropDownOptions}
                className="mr-3 mt-[7px] w-[20%] gap-px font-bold uppercase text-gray-900 sm:mr-0 sm:w-full sm:pr-5"
              />
            </div>
            <div className="flex items-start gap-4 md:flex-col">
  {isFilterVisible && (
    <div className="flex w-[24%] flex-col gap-[21px] md:w-full">
      <CheckBox
        name="customizable"
        label="Customizable"
        id="customizable"
        className="gap-2 py-px pr-[35px] text-left text-lg font-bold uppercase text-gray-900 sm:pr-5"
      />
      <Accordion preExpanded={[0]} className="flex flex-col gap-[25px]">
        {["IDEAL FOR", "OCCASION", "WORK", "FABRIC", "SEGMENT", "SUITABLE FOR", "RAW MATERIAL", "PATTERN"].map((title, i) => (
          <AccordionItem uuid={i} key={`expandablelist${i}`}>
            <div className="flex flex-1 flex-col gap-2">
              <AccordionItemHeading className="w-full">
                <AccordionItemButton>
                  <AccordionItemState>
                    {({ expanded }) => (
                      <div className="flex flex-wrap items-center justify-between gap-5">
                        <Heading as="h2" className="uppercase">
                          {title} {/* Dynamic title from array */}
                        </Heading>
                        <Image
                          src="/images/img_checkmark.svg" // Change this to your actual image path
                          width={16}
                          height={16}
                          alt="checkmark"
                          className="h-[16px] w-[16px] self-end"
                        />
                      </div>
                    )}
                  </AccordionItemState>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="relative mt-[-22px] flex w-[35%] flex-col items-start gap-[23px] md:w-full">
                  <Text size="lg" as="p" className="!text-gray-900">All</Text>
                  <Text size="md" as="p" className="!text-blue_gray-200 underline">Unselect all</Text>
                  <CheckBox name="men" label="Men" id="men" className="gap-2 p-px text-left text-base text-gray-900" />
                  <CheckBox name="women" label="Women" id="women" className="gap-2 p-px text-left text-base text-gray-900" />
                  <CheckBox name="babykids" label="Baby & Kids" id="babykids" className="gap-2 self-stretch text-left text-base text-gray-900" />
                </div>
              </AccordionItemPanel>
            </div>
            <div className="h-px w-full rotate-[0deg] bg-gray-300" />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )}



              {/* Products Section */}
              <div className="grid flex-1 grid-cols-3 gap-4 md:grid-cols-2 md:self-stretch sm:grid-cols-1">
                {products.map((product) => (
                  <div className="flex w-full flex-col" key={product.id}>
                    <div className="relative h-[399px] md:h-auto">
                      <Image
                        src={product.image}
                        width={300}
                        height={399}
                        alt={product.title}
                        className="h-[399px] w-full object-cover"
                      />
                   
                    </div>
                    <div className="flex items-start gap-0.5"> {/* Adjusted outer flex to include alignment */}
                    <div className="flex items-start justify-between"> {/* Added justify-between */}
  <div className="flex flex-col items-start">
    <Heading as="h4" className="uppercase">{product.title}</Heading>
    <div className="flex items-center gap-1 w-full"> {/* Set width to full for the inner flex */}
      <Text as="p" className="underline flex-1"> {/* Allow text to take available space */}
        <span className="text-blue_gray-400">Sign in</span>
        <span className="text-blue_gray-400">
          &nbsp;or Create an account to see pricing
        </span>
      </Text>
      <Img
        src="img_favorite.svg"
        width={24}
        height={24}
        alt="signinimage"
      />
    </div>
  </div>
</div>

</div>

                  </div>
                ))}  
        </div>
      </div>
      </div>
      </div>
      </div>


      {/* Footer Section */}
      <Footer className="flex items-end justify-center self-stretch bg-black-900 p-6 sm:p-5" />
    </div>
  );
}