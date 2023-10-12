<template>
          <nav
          class="navbar navbar-top navbar-expand-md navbar-dark"
          id="navbar-main"
        >
          <div class="container-fluid">
            <form
              class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
            >
              <div class="form-group mb-0">
                <div class="input-group input-group-alternative">
                  <div class="input-group-prepend">
                    <span class="input-group-text"
                      ><i class="fas fa-search"></i
                    ></span>
                  </div>
                  <input class="form-control" placeholder="Search" type="text" />
                </div>
              </div>
            </form>
            <!-- User -->
            <div class="navbar-nav align-items-center d-none d-md-flex">
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" :src="pictureUrl" />
                </span>
                <div class="media-body ml-2 d-none d-lg-block">
                  <span class="mb-0 text-sm font-weight-bold"> {{ name }}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
</template>

<script></script>
