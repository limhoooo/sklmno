export default {
	methods: {
		phoneNumSplitFnc(value, model, formModel) {
			if (value.includes('-')) {
				this.$set(this[formModel], `${model}`, value.replace(/[^0-9]/g, ''));
				this.$set(
					this[formModel],
					`${model}1`,
					this[formModel][model].substring(0, 3),
				);
				this.$set(
					this[formModel],
					`${model}2`,
					this[formModel][model].substring(3, 7),
				);
				this.$set(
					this[formModel],
					`${model}3`,
					this[formModel][model].substring(7, 11),
				);
			} else if (!value.includes('-')) {
				this.$set(this[formModel], `${model}`, value.substring(0, 11));
				this.$set(
					this[formModel],
					`${model}1`,
					this[formModel][model].substring(0, 3),
				);
				this.$set(
					this[formModel],
					`${model}2`,
					this[formModel][model].substring(3, 7),
				);
				this.$set(
					this[formModel],
					`${model}3`,
					this[formModel][model].substring(7, 11),
				);
			}
		},
		regiNumSplitFnc(value, model, formModel) {
			if (value.includes('-')) {
				this.$set(
					this[formModel],
					`${model}Concat`,
					value.replace(/[^0-9]/g, ''),
				);
				this.$set(
					this[formModel],
					`${model}1`,
					this[formModel][model + 'Concat'].substring(0, 6),
				);
				this.$set(
					this[formModel],
					`${model}2`,
					this[formModel][model + 'Concat'].substring(6, 13),
				);
			} else if (!value.includes('-')) {
				this.$set(this[formModel], `${model}Concat`, value.substring(0, 13));
				this.$set(
					this[formModel],
					`${model}1`,
					this[formModel][model + 'Concat'].substring(0, 6),
				);
				this.$set(
					this[formModel],
					`${model}2`,
					this[formModel][model + 'Concat'].substring(6, 13),
				);
			}
		},
		bizNumSplitFnc(value, model, formModel) {
			if (value.includes('-')) {
				this.$set(this[formModel], `${model}`, value.replace(/[^0-9]/g, ''));
				this.$set(
					this[formModel],
					`${model}1`,
					this[formModel][model].substring(0, 3),
				);
				this.$set(
					this[formModel],
					`${model}2`,
					this[formModel][model].substring(3, 5),
				);
				this.$set(
					this[formModel],
					`${model}3`,
					this[formModel][model].substring(5, 10),
				);
			} else if (!value.includes('-')) {
				this.$set(this[formModel], `${model}`, value.substring(0, 10));
				this.$set(
					this[formModel],
					`${model}1`,
					this[formModel][model].substring(0, 3),
				);
				this.$set(
					this[formModel],
					`${model}2`,
					this[formModel][model].substring(3, 5),
				);
				this.$set(
					this[formModel],
					`${model}3`,
					this[formModel][model].substring(5, 10),
				);
			}
		},
	},
};
