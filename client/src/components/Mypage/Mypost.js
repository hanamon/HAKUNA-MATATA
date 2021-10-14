import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import style from './Mypost.module.css';
import dotMenu from '../../images/dot-menu.png';
import PropTypes from 'prop-types';
import commentPic from '../../images/comments.png';
import heart from '../../images/heart.png';
import eye from '../../images/eye.png';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../config.js';

const Mypost = ({ postInfo, getMypost }) => {
  const [dotButton, setDotButton] = useState(false);
  const [modalId, setModalId] = useState('');
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  const haneldModalId = (e) => {
    setModalId(e.target.id);
  };
  const handleDotButton = () => {
    setDotButton(!dotButton);
  };
  const handleDelete = async (e) => {
    const postId = e.target.id;
    try {
      const deletePost = await axios.delete(
        `${REACT_APP_API_URL}/posts/${postId}`,
        { withCredentials: true }
      );
      getMypost();
      console.log(deletePost);
    } catch (err) {
      console.log(err);
    }
  };
  const getPostId = async () => {
    try {
      const url = `${REACT_APP_API_URL}/posts/${postInfo.id}`;
      const response = await axios.get(url, {
        withCredentials: true
      });

      setPosts(response.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  const modifyPost = () => {
    history.push({ pathname: '/edit-post', state: posts });
  };

  document.addEventListener('click', (e) => {
    if (dotButton && e.target.id !== modalId) {
      setDotButton(false);
    }
  });

  return (
    <li className={style.post}>
      <div>
        <div className={style.category}>{postInfo.category.name}</div>
        <div className={style.postTitle}>{postInfo.title}</div>
        <div className={style.subInfo}>
          <div className={style.imageBox}>
            <img className={style.image} src={commentPic} alt="댓글 수" />
            <span className={style.number}>{postInfo.comments}</span>
          </div>
          <div className={style.imageBox}>
            <img className={style.image} src={heart} alt="하트 수" />
            <span className={style.number}>{postInfo.likes}</span>
          </div>
          <div className={style.imageBox}>
            <img className={style.image} src={eye} alt="조회 수" />
            <span className={style.number}>{postInfo.views}</span>
          </div>
        </div>
      </div>
      <div className={style.postRight}>
        <button
          className={
            dotButton ? `${style.dotBox} ${style.dotClick}` : style.dotBox
          }
          id={postInfo.id}
          onClick={(e) => {
            handleDotButton();
            getPostId(e);
            haneldModalId(e);
          }}
        >
          <img
            className={style.dotMenu}
            src={dotMenu}
            alt="수정, 삭제 메뉴버튼"
            id={postInfo.id}
          />
        </button>
        <div className={style.date}>{postInfo.created}</div>
        <div className={dotButton ? style.menuBox : style.hidden}>
          <button
            className={style.modifyButton}
            onClick={() => modifyPost()}
            id={postInfo.id}
          >
            수정
          </button>

          <button
            className={style.deleteButton}
            onClick={(e) => handleDelete(e)}
            id={postInfo.id}
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
};

Mypost.propTypes = {
  postInfo: PropTypes.any.isRequired,
  getMypost: PropTypes.any.isRequired
};
export default Mypost;
