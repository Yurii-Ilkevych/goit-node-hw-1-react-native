import {
  selectIsloading,
  selectErrorCreatePost,
  selectErrorGetPost,
  selectData,
  selectErrorAddComment,
} from "../redux/posts/postsSelectors";
import { useSelector } from "react-redux";

export const usePost = () => {
  const isLoading = useSelector(selectIsloading);
  const errorCreatePost = useSelector(selectErrorCreatePost);
  const errorGetPost = useSelector(selectErrorGetPost);
  const dataPost = useSelector(selectData);
  const errorAddComment = useSelector(selectErrorAddComment);

  return {
    isLoading,
    errorCreatePost,
    errorGetPost,
    dataPost,
    errorAddComment,
  };
};
