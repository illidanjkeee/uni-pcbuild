import { Footer } from "@/components/footer";
import NavDD from "@/components/dropdowns/nav-dd";
import "@mantine/core/styles.css";
import Ham from "@/components/ham";
import Nav from "@/components/nav";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex-col justify-center items-center">
      <Nav className="lg:flex hidden" />
      <Ham className="flex lg:hidden">
        <NavDD></NavDD>
      </Ham>

      <div className="w-full  flex flex-col justify-center items-center ">
        {children}
        <Footer></Footer>
      </div>
    </section>
  );
}
