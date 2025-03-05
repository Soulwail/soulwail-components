import { FormInstance, SelectProps } from 'antd';
import { Positions } from './collections';

/**
 * -
 * @param value
 * @param form
 */
const legendChange = (value: Record<string, any>, form: FormInstance) => {
    if (Reflect.has(value, 'showLegend')) {
        if (value.showLegend) {
            form.setFieldValue(['legend', 'color', 'position'], Positions.TOP);
        } else {
            form.setFieldValue(['legend', 'color', 'position'], Positions.HIDDEN);
        }
    }

    if (Reflect.has(value, 'legend')) {
        if (Reflect.has(value.legend, 'color')) {
            if (Reflect.has(value.legend.color, 'position')) {
                // 如果自定义样式中选择隐藏图例，设置 showLegend 为 false，否则设为 true
                if (value.legend.color.position === Positions.HIDDEN) {
                    form.setFieldValue('showLegend', false);
                } else {
                    form.setFieldValue('showLegend', true);
                }
            }
        }
    }
};

/**
 * - 数据标签
 * @param value
 * @param allValues
 * @param form
 */
const axisChange = (value: Record<string, any>, allValues: Record<string, any>, form: FormInstance) => {
    if (Reflect.has(value, 'showAxis')) {
        if (value.showAxis) {
            form.setFields([
                { name: ['axis', 'x', 'label'], value: true },
                { name: ['axis', 'x', 'tick'], value: true },
                { name: ['axis', 'y', 'label'], value: true },
                { name: ['axis', 'y', 'tick'], value: true },
            ]);
        } else {
            form.setFields([
                { name: ['axis', 'x', 'label'], value: false },
                { name: ['axis', 'x', 'tick'], value: false },
                { name: ['axis', 'y', 'label'], value: false },
                { name: ['axis', 'y', 'tick'], value: false },
            ]);
        }
    }

    // 数据标签
    if (Reflect.has(value, 'axis')) {
        if (Reflect.has(value.axis, 'x')) {
            if (Reflect.has(value.axis.x, 'label')) {
                if (value.axis.x.label) {
                    form.setFields([
                        { name: 'showAxis', value: true },
                        { name: ['axis', 'x', 'tick'], value: true },
                    ]);
                } else {
                    if (!allValues.axis.y.label) {
                        form.setFieldValue('showAxis', false);
                    }

                    form.setFieldValue(['axis', 'x', 'tick'], false);
                }
            }
        }

        if (Reflect.has(value.axis, 'y')) {
            if (Reflect.has(value.axis.y, 'label')) {
                if (value.axis.y.label) {
                    form.setFields([
                        { name: 'showAxis', value: true },
                        { name: ['axis', 'y', 'tick'], value: true },
                    ]);
                } else {
                    if (!allValues.axis.x.label) {
                        form.setFieldValue('showAxis', false);
                    }

                    form.setFieldValue(['axis', 'y', 'tick'], false);
                }
            }
        }
    }
};

/**
 * - 分组聚合
 * @param value
 * @param allValues
 * @param categoryList
 * @param colorCategoryList
 * @param form
 */
const encodeColorChange = (
    value: Record<string, any>,
    allValues: Record<string, any>,
    categoryList: SelectProps['options'],
    colorCategoryList: SelectProps['options'],
    form: FormInstance,
) => {
    if (Reflect.has(value, 'encodeColor')) {
        if (value.encodeColor && colorCategoryList && colorCategoryList.length > 0) {
            form.setFieldValue(['encode', 'color'], colorCategoryList[0].value);
        } else {
            form.setFieldValue(['encode', 'color'], null);
        }
    }

    if (Reflect.has(value, 'encode')) {
        if (Reflect.has(value.encode, 'x')) {
            const newOpts = categoryList?.filter((item) => item.value !== value.encode.x) || [];

            // 如果开启了分组聚合，并且 x 轴选择的值和分组聚合的值一致
            // 切换分组聚合的值
            if (
                newOpts.length > 0 &&
                value.encode.x &&
                allValues.encodeColor &&
                value.encode.x === allValues.encode.color
            ) {
                form.setFieldValue(['encode', 'color'], newOpts[0].value);
            }
        }
    }
};

export { axisChange, encodeColorChange, legendChange };
