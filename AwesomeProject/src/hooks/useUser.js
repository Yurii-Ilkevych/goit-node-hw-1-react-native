import { useSelector } from "react-redux";
import {
  selectErroUpdate,
  selectErrorLogin,
  selectErrorRegister,
  selectIsLoading,
  selectUser,
  selectErrorDeleteAvatar,
  selectErrorAddAvatar,
} from "../redux/authUser/authSelectors";

export const useUser = () => {
  const isLoading = useSelector(selectIsLoading);
  const errorUpdate = useSelector(selectErroUpdate);
  const errorLogin = useSelector(selectErrorLogin);
  const errorRegister = useSelector(selectErrorRegister);
  const user = useSelector(selectUser);
  const errorDeleteAvatar = useSelector(selectErrorDeleteAvatar);
  const errorAddAvatar = useSelector(selectErrorAddAvatar);

  return {
    isLoading,
    errorUpdate,
    errorLogin,
    errorRegister,
    user,
    errorDeleteAvatar,
    errorAddAvatar,
  };
};
