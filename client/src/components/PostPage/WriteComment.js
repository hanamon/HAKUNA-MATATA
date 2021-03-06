import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginModal } from '../../store/modal-slice';
import style from './WriteComment.module.css';
import userImg from '../../images/icons/user.png';
import axios from 'axios';
import PropTypes from 'prop-types';
import { REACT_APP_API_URL } from '../../config';

const WriteComment = ({ pathName, setComments, comments, setPosts, posts }) => {
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.isLogin);
  const { isLogin } = loginState;

  const [commentContent, setCommentContent] = useState('');
  const [userInfo, setUserinfo] = useState({});

  const sendComment = async () => {
    try {
      if (!isLogin) {
        dispatch(showLoginModal(true));
      }
      if (commentContent && isLogin) {
        const url = `${REACT_APP_API_URL}/posts/${pathName}/comments`;
        const config = {
          'Content-Type': 'application/json',
          withCredentials: true
        };

        const newCommentId = await axios.post(
          url,
          { content: commentContent },
          config
        );

        setPosts({ ...posts, comments: comments.length + 1 });

        if (newCommentId.data.id) {
          const newComments = await axios.get(url);
          setComments(newComments.data.comments);
        }

        setCommentContent('');
      }
    } catch (err) {
      if (!isLogin) dispatch(showLoginModal(true));
    }
  };

  const handleInputValue = (e) => {
    setCommentContent(e.target.value);
  };

  useEffect(() => {
    const url = `${REACT_APP_API_URL}/users/userinfo`;
    axios.get(url).then((response) => {
      setUserinfo(response.data.userInfo);
    });
  }, []);

  return (
    <section className={style.section3}>
      <div className={style.writecomment}>
        <div className={style.userProfile}>
          <img
            src={
              userInfo.image
                ? `https://hakunamatata.kr${userInfo.image}`
                : userImg
            }
            alt="user comment img"
          />
        </div>
        <textarea
          placeholder="????????? ???????????????."
          className={style.textarea}
          onChange={(e) => handleInputValue(e)}
          value={commentContent}
        />
      </div>
      <div className={style.submitWrap}>
        <button type="submit" className={style.submitcom} onClick={sendComment}>
          ?????? ??????
        </button>
      </div>
    </section>
  );
};

WriteComment.propTypes = {
  pathName: PropTypes.any,
  setComments: PropTypes.any,
  comments: PropTypes.any,
  setPosts: PropTypes.any,
  posts: PropTypes.any
};

export default WriteComment;
