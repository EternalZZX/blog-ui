import Vue from 'vue';

class Loading {
    constructor (debounce = 300) {
        this.instance = null;
        this.debounce = debounce;
    }

    _loadingFactory () {
        const self = this;
        const LoadingComponent = Vue.extend({
            data () {
                return {
                    finish: false
                };
            },
            template: `
            <div class="et-loading"
                :class="{'et-loading_finish': finish}">
            </div>`,
            methods: {
                close () {
                    this.finish = true;
                    setTimeout(() => {
                        this.$el.parentNode.removeChild(this.$el);
                        this.$destroy();
                        self.instance = null;
                    }, self.debounce);
                }
            }
        });
        return new LoadingComponent();
    }

    isActive () {
        return this.instance !== null;
    }

    open () {
        if (this.instance) {
            return this.instance;
        }
        const instance = this._loadingFactory();
        document.body.appendChild(instance.$mount().$el);
        this.instance = instance;
        return instance;
    }

    close () {
        this.instance && this.instance.close();
        return null;
    }
}

export default new Loading(300);
