import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { hoverColor } from "../color";

const Layout = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav nav" "main main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "220px 1fr",
      }}
    >
      <GridItem area="nav" bgColor={hoverColor()}>
        <Navbar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" bgColor={hoverColor()} minHeight="100vh">
          <Sidebar onClose={() => {}} />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Layout;
