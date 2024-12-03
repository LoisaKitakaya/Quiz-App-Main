import { siteTitle } from "../../utils/siteInfo";
import { MetaProvider, Title } from "@solidjs/meta";

const Metadata = (props) => {
  return (
    <MetaProvider>
      <Title>
        {siteTitle} | {props.title}
      </Title>
    </MetaProvider>
  );
};

export default Metadata;
