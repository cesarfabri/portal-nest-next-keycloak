import { useKeycloak } from "@react-keycloak/ssr";
import type { NextPage } from "next";
import { useRouter } from "next/router";


// pagina estatica
const Home: NextPage = () => {
  const {initialized, keycloak} = useKeycloak();
  const router = useRouter();

  if (
    typeof window !== "undefined" &&
    initialized && !keycloak?.authenticated) {
    router.replace('/login')
    return null;
  }

  //Context API
  return keycloak?.authenticated ? <div>Hello World</div> : null;
};

export default Home;
