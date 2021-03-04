import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton, Link } from "@material-ui/core";
import Icon from "@mdi/react";

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from "@mdi/js";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import Kerjasama from "../../pages/kerjasama/Kerjasama";
import TambahKerjasama from "../../pages/kerjasama/TambahKerjasama";
import EditKerjasama from "../../pages/kerjasama/EditKerjasama";
import ProgramStudi from "../../pages/programstudi/ProgramStudi";
import TambahProgramStudi from "../../pages/programstudi/TambahProgramStudi";
import EditProgramStudi from "../../pages/programstudi/EditProgramStudi";

import JenisPartner from "../../pages/jenispartner/JenisPartner";
import TambahJenisPartner from "../../pages/jenispartner/TambahJenisPartner";
import EditJenisPartner from "../../pages/jenispartner/EditJenisPartner";

import JenisDokumen from "../../pages/jenisdokumen/JenisDokumen";
import TambahJenisDokumen from "../../pages/jenisdokumen/TambahJenisDokumen";
import EditJenisDokumen from "../../pages/jenisdokumen/EditJenisDokumen";

import BentukKegiatan from "../../pages/bentukkegiatan/BentukKegiatan";
import TambahBentukKegiatan from "../../pages/bentukkegiatan/TambahBentukKegiatan";
import EditBentukKegiatan from "../../pages/bentukkegiatan/EditBentukKegiatan";

import Mahasiswa from "../../pages/mahasiswa/Mahasiswa";
import TambahMahasiswa from "../../pages/mahasiswa/TambahMahasiswa";
import EditMahasiswa from "../../pages/mahasiswa/EditMahasiswa";

import Negara from "../../pages/negara/Negara";
import TambahNegara from "../../pages/negara/TambahNegara";
import EditNegara from "../../pages/negara/EditNegara";

import Tingkat from "../../pages/tingkat/Tingkat";
import TambahTingkat from "../../pages/tingkat/TambahTingkat";
import EditTingkat from "../../pages/tingkat/EditTingkat";

import Kategori from "../../pages/kategori/Kategori";
import TambahKategori from "../../pages/kategori/TambahKategori";
import EditKategori from "../../pages/kategori/EditKategori";

import Dosen from "../../pages/dosen/Dosen";
import Publikasi from "../../pages/publikasi/Publikasi";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/typography" component={Typography} />
            <Route path="/app/tables" component={Tables} />

            <Route path="/app/kerjasama" component={Kerjasama} />
            <Route path="/app/tambahKerjasama" component={TambahKerjasama} />
            <Route path="/app/editKerjasama/:id" component={EditKerjasama} />

            <Route path="/app/publikasi" component={Publikasi} />

            <Route path="/app/programstudi" component={ProgramStudi} />
            <Route
              path="/app/tambahProgramStudi"
              component={TambahProgramStudi}
            />
            <Route
              path="/app/editProgramStudi/:id"
              component={EditProgramStudi}
            />

            <Route path="/app/jenispartner" component={JenisPartner} />
            <Route
              path="/app/tambahJenisPartner"
              component={TambahJenisPartner}
            />
            <Route
              path="/app/editJenisPartner/:id"
              component={EditJenisPartner}
            />

            <Route path="/app/jenisdokumen" component={JenisDokumen} />
            <Route
              path="/app/tambahJenisDokumen"
              component={TambahJenisDokumen}
            />
            <Route
              path="/app/editJenisDokumen/:id"
              component={EditJenisDokumen}
            />

            <Route path="/app/bentukkegiatan" component={BentukKegiatan} />
            <Route
              path="/app/tambahBentukKegiatan"
              component={TambahBentukKegiatan}
            />
            <Route
              path="/app/editBentukKegiatan/:id"
              component={EditBentukKegiatan}
            />

            <Route path="/app/mahasiswa" component={Mahasiswa} />
            <Route path="/app/tambahMahasiswa" component={TambahMahasiswa} />
            <Route path="/app/editMahasiswa/:id" component={EditMahasiswa} />

            <Route path="/app/negara" component={Negara} />
            <Route path="/app/tambahNegara" component={TambahNegara} />
            <Route path="/app/editNegara/:id" component={EditNegara} />

            <Route path="/app/tingkat" component={Tingkat} />
            <Route path="/app/tambahTingkat" component={TambahTingkat} />
            <Route path="/app/editTingkat/:id" component={EditTingkat} />

            <Route path="/app/kategori" component={Kategori} />
            <Route path="/app/tambahKategori" component={TambahKategori} />
            <Route path="/app/editKategori/:id" component={EditKategori} />

            <Route path="/app/dosen" component={Dosen} />
            <Route path="/app/notifications" component={Notifications} />
            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
          </Switch>
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            {/* <div>
              <Link
                color={"primary"}
                href={"https://flatlogic.com/"}
                target={"_blank"}
                className={classes.link}
              >
                Flatlogic
              </Link>
              <Link
                color={"primary"}
                href={"https://flatlogic.com/about"}
                target={"_blank"}
                className={classes.link}
              >
                About Us
              </Link>
              <Link
                color={"primary"}
                href={"https://flatlogic.com/blog"}
                target={"_blank"}
                className={classes.link}
              >
                Blog
              </Link>
            </div>
            <div>
              <Link
                href={"https://www.facebook.com/flatlogic"}
                target={"_blank"}
              >
                <IconButton aria-label="facebook">
                  <Icon path={FacebookIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
              <Link href={"https://twitter.com/flatlogic"} target={"_blank"}>
                <IconButton aria-label="twitter">
                  <Icon path={TwitterIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
              <Link href={"https://github.com/flatlogic"} target={"_blank"}>
                <IconButton aria-label="github" style={{ marginRight: -12 }}>
                  <Icon path={GithubIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
            </div> */}
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
