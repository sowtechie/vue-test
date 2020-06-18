<template>

<div>

  <div class="apc-footer" role="content-info">
    <footer>
      <div class="container mt-3">
        <div class="footer-primary">
          <div class="row" role="presentation">
            <div class="col-lg-3 col-md-6">
              <ul class role="presentation">
                <p
                  class="body-bold white text-sm-center text-md-left mb-0 px-2 footermenu"
                >Provider tools</p>
                <li>
                  <a
                    href="/apca/apc/wcm/connect/es/provider_content_en/guidelines_resources/prospective_providers"
                  >Become a Verizon Wireless Provider</a>
                </li>
                <li>
                  <a
                    href="/apca/apc/wcm/myconnect/es/provider_content_en/news_education/webinars"
                  >Sign up for webinars</a>
                </li>
                <li>
                  <a
                    href="/apca/apc/wcm/connect/es/provider_content_en/guidelines_resources/overview#manuals"
                  >Provider manuals</a>
                </li>
                <li>
                  <a
                    href="/apca/apc/wcm/connect/es/provider_content_en/guidelines_resources/overview#resources"
                  >Provider referal</a>
                </li>
                <li>
                  <a
                    href="/apca/apc/wcm/connect/es/provider_content_en/about_pc/contact_us"
                  >Contact us</a>
                </li>
              </ul>
            </div>
            <!--  Quick links -->
            <div class="col-lg-3 col-md-6">
              <ul class role="presentation">
                <p
                  class="body-bold white text-sm-center text-md-left mb-0 px-2 footermenu"
                >Quick links</p>
                <li>
                  <a
                    href="/apca/apc/wcm/connect/es/provider_content_en/about_pc"
                  >About provider connection</a>
                </li>
                <li>
                  <a
                    href="https://www.blueshieldca.com/apca/apc/public/common/PortalComponents/es/StreamDocumentServlet?fileName=PRV_Provider_Connection_Reference_Guide.pdf"
                  >Provider connection reference guide</a>
                </li>
                <li>
                  <a
                    href="/es/account-tools/registration/home.sp?reset=true"
                  >Register for provider connection</a>
                </li>
                <li>
                  <a
                    href="/es/account-tools/username-password-help.sp"
                  >Forgot username/password</a>
                </li>
                <li>
                  <a
                    href="/es/account-tools/manage-profile/change-password.sp"
                  >Change password</a>
                </li>
                <li>
                  <a
                    href="/apca/apc/wcm/connect/es/provider_content_en/about_pc/help"
                  >Compatible browsers</a>
                </li>
              </ul>
            </div>
            <!--  Our Company -->
            <div class="col-lg-3 col-md-6">
              <ul class role="presentation">
                <p
                  class="body-bold white text-sm-center text-md-left mb-0 px-2 footermenu"
                >Our company</p>
                <li>
                  <a href="/about">About Verizon Wireless of California</a>
                </li>
                <li>
                  <a href="/apca/apc/public/member/mp/home">Verizon Wireless member home page</a>
                </li>
                <li>
                  <a href="https://www.blueshieldca.com/media">Verizon Wireless news</a>
                </li>
              </ul>
            </div>
            <!-- Legal Notice -->
            <div class="col-lg-3 col-md-6">
              <ul class role="presentation">
                <p
                  class="body-bold white text-sm-center text-md-left mb-0 px-2 footermenu"
                >Legal notices</p>
                <li>
                  <a href="/about/nondiscrimination">Nondiscrimination notice</a>
                </li>
                <li>
                  <a href="/privacy">Privacy</a>
                </li>
                <li>
                  <a href="/terms">Terms of use</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
  <div class="privacy">
    <div class="container copyright">
      <div class="row">
        <div class="col-12">
          <ul class="list-unstyled clearfix">
            <li class="col-12 col-lg-12 copyright-text apc-portal">
              © Verizon Wireless of United Stated 1999-2020. All rights reserved. Verizon Wireless of Uinted States is an independent member of the Blue
              Wireless Association.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>


  </div>
</template>

<script>
import "./ufooter.css";
export default {
  data() {
    return {
      headers: [],

      form: {
        name: "sv"
      },

      show: true
    };
  }
};
</script>
