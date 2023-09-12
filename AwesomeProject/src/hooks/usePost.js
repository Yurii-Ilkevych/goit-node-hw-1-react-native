import {
  selectIsloading,
  selectErrorCreatePost,
  selectErrorGetPost,
  selectData,
  selectErrorAddComment,
  selectErrorGetAllPost,
  selectaÁllData,
  selectDataComment,
  selectErrorGetCommentForCurrentPost,
  selectErrorAddLike
} from "../redux/posts/postsSelectors";
import { useSelector } from "react-redux";

export const usePost = () => {
  const isLoading = useSelector(selectIsloading);
  const errorCreatePost = useSelector(selectErrorCreatePost);
  const errorGetPost = useSelector(selectErrorGetPost);
  const dataPost = useSelector(selectData);
  const errorAddComment = useSelector(selectErrorAddComment);
  const errorGetAllPost = useSelector(selectErrorGetAllPost);
  const allData = useSelector(selectaÁllData);
  const errorGetCommentForCurrentPost = useSelector(selectErrorGetCommentForCurrentPost)
  const dataComment = useSelector(selectDataComment)
  const errorAddLike = useSelector(selectErrorAddLike)

  return {
    isLoading,
    errorCreatePost,
    errorGetPost,
    dataPost,
    errorAddComment,
    errorGetAllPost,
    allData,
    errorGetCommentForCurrentPost,
    dataComment,
    errorAddLike
  };
};
