import { StarFilled } from '@ant-design/icons';
import { Flex, HStack } from '@chakra-ui/react';
import { Col, Image, Modal, Row, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { IconContext } from 'react-icons';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsBagHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleShows } from '../AxiosClient';
import { calculatePrice, resetPrice, userOrderList } from '../store/slices/AuthSlice';
import Style from '../style/single.module.scss';

function SingleShow() {
  const [item, setItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);

  //____ Check is user loggin or not
  const { userExit, userMovieDetails } = useSelector((state) => state.user);
  const currentUser = userMovieDetails.find((i) => i.isUser === true);

  //_____ For get productId
  const params = useParams();

  //_____ For calling reducer's methods
  const dispatch = useDispatch();

  //_____ Fetching Single Product
  useEffect(() => {
    let controller = new AbortController();

    //____ fetching  shows
    const fetchingData = async () => {
      try {
        const { data } = await getSingleShows(params.showId);
        setItem(data);
        dispatch(resetPrice());
        controller = null;
      } catch (err) {
        console.error(err);
      }
    };
    fetchingData();

    // clean up
    return () => controller?.abort();
  }, []);

  //_____ Set product to bag
  const bookMovie = (item) => {
    if (userExit) {
      console.log(item);
      setOpen(true);
    } else {
      setOpen(false);
      toast.error('Create Account..');
    }
  };
  //____ Decrement the Items
  const decrement = (event) => {
    event.preventDefault();

    if (quantity > 0) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity);
    }
    dispatch(calculatePrice(quantity));
  };

  //_____ Increment the Items
  const increment = (event) => {
    event.preventDefault();

    if (quantity < 20) {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity);
    }
    dispatch(calculatePrice(quantity));
  };

  //___ checkout
  const handleCheckout = (event) => {
    event.preventDefault();
    dispatch(calculatePrice(quantity));
    dispatch(userOrderList(item));
    dispatch(resetPrice());
    setOpen(false);
  };

  //___cancel
  const handleCancel = () => {
    setQuantity(0);
    setOpen(false);
    dispatch(resetPrice());
  };

  return (
    <main className="singleproduct lg:py-[4rem] container mx-auto">
      {item !== null ? (
        <>
          <Row className="xl:mx-[10rem] mx-2" align={'middle'}>
            {/* SingleProduct Image */}
            <Col
              xs={{ span: 24 }}
              lg={{ span: 8 }}
              className={`${Style.image_height} lg:border-r-2 flex justify-center items-center p-4 overflow-hidden`}
            >
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) =>
                    console.log(`current index: ${current}, prev index: ${prev}`),
                }}
              >
                <Image width={500} src={item.image.original} />
              </Image.PreviewGroup>
            </Col>

            {/* SingleProduct Details */}
            <Col xs={{ span: 24 }} lg={{ span: 12 }} className="md:p-8 p-3">
              <h1 className="lg:text-[2.6rem] text-2xl font-bold uppercase mb-4">{item.name}</h1>
              <p className="lg:text-lg text-base text-gray-700 text-justify my-6">
                {item.summary.replace(/(<([^>]+)>)/gi, '')}
              </p>

              {item.rating.average !== null ? (
                <p className="lg:text-2xl text-base text-yellow-500 break-words my-4 flex items-center">
                  <StarFilled className="mr-1 " /> {item.rating.average}/10
                </p>
              ) : (
                <></>
              )}

              <p className="lg:text-md text-base break-words">
                Ended Date: <i className="italic font-semibold">{item.ended}</i>
              </p>
              <p className="lg:text-md text-base break-words my-2">
                language: <i className="italic font-semibold"> {item.language}</i>
              </p>
              <div className="flex flex-wrap gap-2">
                {userExit ? (
                  <>
                    <button
                      onClick={() => {
                        bookMovie(item);
                      }}
                      className="hover:bg-red-900 md:text-base btn_class"
                    >
                      <IconContext.Provider value={{ size: '18px' }}>
                        <BsBagHeartFill className="mr-2" />
                      </IconContext.Provider>
                      <span>Book Ticket</span>
                    </button>

                    <Modal
                      title={item.name}
                      open={open}
                      onOk={handleCheckout}
                      onCancel={handleCancel}
                      className={Style.fixBtn}
                    >
                      <form onSubmit={handleCheckout}>
                        <p className="p-3 bg-red-400 w-full text-lg font-semibold text-white">
                          Book Your Ticket
                        </p>
                        <Flex justifyContent={'space-between'}>
                          <p className="py-3 text-slate-900 font-bold text-base">
                            Note - Available seats are only 20
                          </p>
                          <HStack>
                            <button
                              className="px-2 text-slate-900 rounded-full text-2xl"
                              onClick={increment}
                            >
                              <AiOutlinePlusCircle />
                            </button>
                            <span className="text-black">{quantity}</span>
                            <button
                              className="px-2 text-slate-900 rounded-full text-2xl"
                              onClick={decrement}
                            >
                              <AiOutlineMinusCircle />
                            </button>
                          </HStack>
                        </Flex>

                        <HStack
                          justifyContent={'space-between'}
                          className="my-4 px-2 text-xl border-t-2"
                        >
                          <p>Grand Total</p>
                          <p> ₹ {currentUser.total}</p>
                        </HStack>
                      </form>
                    </Modal>
                  </>
                ) : (
                  <button
                    onClick={() => toast.error('create account')}
                    className="hover:bg-red-900 md:text-base btn_class"
                  >
                    <IconContext.Provider value={{ size: '18px' }}>
                      <BsBagHeartFill className="mr-2" />
                    </IconContext.Provider>
                    <span>Book Ticket</span>
                  </button>
                )}
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <Row className="h-auto xl:mx-[10rem] mx-2">
          {/* SingleProduct Image */}
          <Col
            xs={{ span: 24 }}
            lg={{ span: 12 }}
            className={`${Style.skeleton} lg:border-r-2 flex justify-center items-center p-4 overflow-hidden`}
          >
            <Skeleton.Image active={true} style={{ width: '100%', height: '40vh' }} />
          </Col>

          {/* SingleProduct Details */}
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="p-8">
            <Skeleton />
            <Skeleton.Input active={true} size={'default'} className="mt-6" />
          </Col>
        </Row>
      )}
    </main>
  );
}

export default SingleShow;
