<template>
  <v-app id="inspire">
    <v-main class="auth-layout-main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts"></script>
<style>
#inspire {
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(231, 238, 242, 1) 0%,
    rgba(224, 230, 239, 1) 50%,
    rgba(189, 195, 199, 1) 100%
  );

  width: 100%;
  min-height: 100dvh;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(#444 1px, transparent 1px);
    background-size: 4px 4px;
    opacity: 0.05;
    pointer-events: none;
    z-index: 0;
  }
}

/* .auth-layout-main {
  height: 100vh;
  width: 100%;
  background-image: url("/resources/images/auth-background.jpg");
  background-size: cover;
  background-position: center center;
} */
</style>
