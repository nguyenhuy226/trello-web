import { ButtonStyle } from "./style";
import { LoadingOutlined } from "@ant-design/icons";

export default function Button({ loading, children, ...props }) {
  return (
    <ButtonStyle
      disabled={loading}
      className={`btn main rect gap-3 ${props.className ?? ""}`}
      {...props}
    >
      {loading && (
        <LoadingOutlined
          style={{
            fontSize: 20,
            paddingRight: 10,
          }}
        />
      )}
      {children}
    </ButtonStyle>
  );
}
