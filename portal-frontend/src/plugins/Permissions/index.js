const Permissions = {
    install (Vue) {
        Vue.mixin({
            data () {
                return {
                };
            },
            methods: {
                permit (groups = [], user = {}) {
                    if (groups.length == 0) return true
                    return groups.filter(group => group == (user || {}).group).length;
                }
            }
        });
        Vue.prototype.$permit = function (group, user) {
            return this.$root.permit(group, user)
        };
    }
};
export default Permissions;