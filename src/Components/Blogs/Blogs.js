/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import { selectSearchInput, setBlogData, selectBlogData } from '../../Features/userSlice';
import styles from './Blogs.module.css';

function Blogs() {
  // eslint-disable-next-line no-unused-vars
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();
  // Select  the data from the state
  let searchInput = useSelector(selectSearchInput);
  // eslint-disable-next-line no-console
  console.log('searchInput', searchInput);
  if (!searchInput) {
    // eslint-disable-next-line no-console
    searchInput = 'new';
  }
  const blogUrl = `http://newsapi.org/v2/everything?q=${searchInput}&apiKey=ec859c1f4dcd4e0b8b7220544371604b`;
  React.useEffect(() => {
    axios
      .get(blogUrl)
      .then((res) => {
        dispatch(setBlogData(res.data));
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, [searchInput]);

  const BlogData = useSelector(selectBlogData);
  // eslint-disable-next-line no-console
  console.log('blogData', blogs.articles);
  // eslint-disable-next-line array-callback-return

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={styles.blog_page}>
      <h1 className={styles.blog_page_header}>Blogs</h1>
      {blogs.articles === undefined ? <CircularProgress /> : (
        <div className={styles.blogs}>
          {blogs.articles.map((article) => (
            <Link className={styles.blog} href={article.url} target="_blank">
              <img src={article.urlToImage} />
              <div>
                <h3 className={styles.sourceName}>
                  <span>{article.source.name}</span>
                  <p>{article.publishedAt}</p>
                </h3>
                <h1>{article.title}</h1>
                <p>{article.description}</p>
              </div>
            </Link>
          ))}
          {blogs.articles.length === 0 ? (
            <h1 className={styles.no_blogs}>
              No blogs available 😞. Search something else to read blogs on the
              greatest platform.
            </h1>
          ) : null}
        </div>
      )}

    </div>

  );
}

export default Blogs;
/*
<div className={styles.blogs}>
        {blogs.articles.map((article) => (
          <Link className={styles.blog} href={article.url} target="_blank">
            <img src={article.image} />
            <div>
              <h3 className={styles.sourceName}>
                <span>{article.source.name}</span>
                <p>{article.publishedAt}</p>
              </h3>
              <h1>{article.title}</h1>
              <p>{article.description}</p>
            </div>
          </Link>
        ))}
        {blogs.totalArticles === 0 && (
        <h1 className={styles.no_blogs}>
          No blogs available 😞. Search something else to read blogs on the
          greatest platform.
        </h1>
        )}
      </div>

*/
