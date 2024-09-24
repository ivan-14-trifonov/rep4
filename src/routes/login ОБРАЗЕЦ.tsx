import { FC, useContext, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button, notification } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { RoutesContext } from "../../utils/routesContext";

type Props = {};

const Root = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const SignIn: FC<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const routes = useContext(RoutesContext);

  const provider = new GoogleAuthProvider();

  const auth = getAuth();
  auth.languageCode = "ru";

  const handleAuth = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then(() => {
        routes?.setRoutes([]);
      })
      .catch(() => {
        notification.error({
          message: "Ошибка авторизации",
          description: "Авторизация не была воспроизведена. Повторите еще раз.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Root>
      <p>Войдите через Google для начала работы</p>
      <Button
        type="primary"
        shape="round"
        icon={<GoogleOutlined />}
        size="large"
        loading={isLoading}
        onClick={handleAuth}
      >
        Войти через Google
      </Button>
    </Root>
  );
};
