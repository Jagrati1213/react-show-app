import { Avatar, Card, Col, Row, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getShows } from '../../AxiosClient';
import style from '../../style/card.module.scss';

const { Meta } = Card;

function CardShow() {
  const [shows, setShows] = useState(null);

  useEffect(() => {
    let controller = new AbortController();

    //____ fetching  shows
    const fetchingData = async () => {
      try {
        const { data } = await getShows();
        console.log(data);
        setShows(data);
        controller = null;
      } catch (err) {
        console.error(err);
      }
    };
    fetchingData();

    // clean up
    return () => controller?.abort();
  }, []);

  return (
    <main className="p-4 md:p-10 w-full py-10 site-card-wrapper mt-20">
      <Row gutter={{ xs: 8, sm: 16, lg: 32 }} justify="center">
        {shows
          ? shows.map((i) => {
              return (
                <Col
                  className="gutter-row cursor-pointer rounded"
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 6 }}
                  key={i.show.id}
                >
                  <Link to={`/${i.show.id}`}>
                    <Card
                      className=" overflow-hidden mb-8"
                      cover={
                        <div className=" overflow-hidden h-[400px]">
                          <img
                            alt="item"
                            className="w-full rounded-s h-full"
                            src={i.show.image.original}
                          />
                        </div>
                      }
                    >
                      <Meta
                        title={i.show.name}
                        description={i.show.genres.map((ele, i) => (
                          <span key={i}>{ele} </span>
                        ))}
                      />
                    </Card>
                  </Link>
                </Col>
              );
            })
          : Array(8)
              .fill(null)
              .map((_, i) => {
                return (
                  <Col
                    className="gutter-row my-3 cursor-pointer"
                    xs={{ span: 24 }}
                    sm={{ span: 12 }}
                    md={{ span: 12 }}
                    lg={{ span: 8 }}
                    xl={{ span: 6 }}
                    key={i}
                  >
                    <Card
                      loading={true}
                      cover={
                        <div className={`${style.skeleton_parent}`}>
                          <Skeleton.Image active={true} />
                        </div>
                      }
                    >
                      <Skeleton loading={true} avatar active={true}>
                        <Meta
                          avatar={
                            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                          }
                          title="Card title"
                          description="This is the description"
                        />
                      </Skeleton>
                    </Card>
                  </Col>
                );
              })}
      </Row>
    </main>
  );
}
export default CardShow;
