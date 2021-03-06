import { deviceEnquire, DEVICE_TYPE } from './device';
import { mapState } from 'vuex';

const mixin = {
  computed: {
    ...mapState({
      sidebarOpened: state => state.app.sidebar,
      layoutMode: state => state.app.layout,
      navTheme: state => state.app.theme,
      contentWidth: state => state.app.contentWidth,
      fixSidebar: state => state.app.fixSidebar,
      fixHeader: state => state.app.fixHeader,
      multiTab: state => state.app.multiTab,
    })
  },
  methods: {
    isTopMenu () {
      return this.layoutMode === 'topmenu';
    },
    isSideMenu () {
      return !this.isTopMenu();
    }
  }
};

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE;
    },
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP;
    },
    isTablet () {
      return this.device === DEVICE_TYPE.TABLET;
    }
  }
};

// 获取设备值 => 初始化配置值
const AppDeviceEnquire = {
  mounted () {
    const { $store } = this;
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('TOGGLE_DEVICE', 'desktop');
          $store.dispatch('setSidebar', true);
          break;
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet');
          $store.dispatch('setSidebar', false);
          break;
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('TOGGLE_DEVICE', 'mobile');
          $store.dispatch('setSidebar', true);
          break;
      }
    });
  }
};

export { mixin, AppDeviceEnquire, mixinDevice };
