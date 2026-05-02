import { mount } from '@vue/test-utils';

import BaseButton from '@/shared/components/base/BaseButton.vue';

describe('BaseButton', () => {
  it('renderiza el slot cuando no está cargando', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Guardar cambios',
      },
    });

    expect(wrapper.text()).toContain('Guardar cambios');
  });

  it('muestra estado de carga y deshabilita el botón', () => {
    const wrapper = mount(BaseButton, {
      props: {
        loading: true,
      },
    });

    expect(wrapper.text()).toContain('Procesando...');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });
});
