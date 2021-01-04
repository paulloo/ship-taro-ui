import Taro from '@tarojs/taro';
import classnames from 'classnames';
import PropTypes, {InferProps, InferProps } from 'prop-types'
import { AtInputNumberProps } from 'types/input-number'
import { View, Text, Label, Input } from '@tarojs/components';
import _isEmpty from 'lodash/isEmpty';
import _toString from 'lodash/toString';
import AtComponent from '../../common/component';
import { initTestEnv } from '../../common/utils';

initTestEnv()

function getInputProps (props) {
    const actualProps = {
        type: props.type,
        maxLength: props.maxLength,
        disabled: props.disabled,
        password: false,
    }
    switch (actualProps.type) {
        case 'phone':
            actualProps.type = 'number'
            actualProps.maxLength = 11
            break
        case 'password':
            actualProps.password = true
            break
        default:
            break
    }
    if (!props.disabled && !props.editable) {
        actualProps.disabled = true
    }
    return actualProps
}

// 实现两数相加并保留小数点后最短尾数
function addNum (num1, num2) {
    let sq1, sq2
    try {
        sq1 = _toString(num1).split('.')[1].length
    } catch (e) {
        sq1 = 0
    }
    try {
        sq2 = _toString(num2).split('.')[1].length
    } catch (e) {
        sq2 = 0
    }
    const m = Math.pow(10, Math.max(sq1, sq2))
    return (Math.round(num1 * m) + Math.round(num2 * m)) / m
}

// 格式化数字，处理01变成1,并且不处理1. 这种情况
function parseValue (num) {
    if (num === '') return '0'

    const numStr = _toString(num)
    if (numStr.indexOf('0') === 0
        && numStr.indexOf('.') === -1) {
        // 处理01变成1,并且不处理1.
        return _toString(parseFloat(num))
    }
    return _toString(num)
}

export default class AtInputNumber extends AtComponent<AtInputNumberProps> {
    public static defaultProps: AtInputNumberProps
    public static propTypes: InferProps<AtInputNumberProps>

    constructor(props: AtInputNumberProps) {
        super(props);
        this.state = {
        };
    }

    onInput = event => this.props.onChange(event.target.value, event)

    onFocus = event => this.props.onFocus(event.target.value, event)
  
    onBlur = event => {
      this.props.onBlur(event.target.value, event)
      // fix # 583 AtInput 不触发 onChange 的问题
      this.props.onChange(event.target.value, event)
    }
  
    onConfirm = event => this.props.onConfirm(event.target.value, event)
  
    onClick = () => !this.props.editable && this.props.onClick()
  
    clearValue = () => this.props.onChange('')
  
    onErrorClick = () => this.props.onErrorClick()
    
    handleClick (clickType) {
        const { disabled, value, min, max, step } = this.props
        const lowThanMin = (clickType === 'minus' && value <= min)
        const overThanMax = (clickType === 'plus' && value >= max)
        if (lowThanMin || overThanMax || disabled) {
          const deltaValue = clickType === 'minus' ? -step : step
          const errorValue = addNum(value, deltaValue)
          if (disabled) {
            this.handleError({
              type: 'DISABLED',
              errorValue,
            })
          } else {
            this.handleError({
              type: lowThanMin ? 'LOW' : 'OVER',
              errorValue,
            })
          }
          return
        }
        const deltaValue = clickType === 'minus' ? -step : step
        let newValue = addNum(value, deltaValue)
        newValue = this.handleValue(newValue)
        this.props.onChange(newValue)
    }

    handleInput = (e, ...arg) => {
        const { value } = e.target
        const { disabled } = this.props
        if (disabled) return

        const newValue = this.handleValue(value)
        this.props.onChange(newValue, e, ...arg)
        return newValue
    }

    handleBlur = (...arg) => this.props.onBlur(...arg)

    handleError = errorValue => {
        if (!this.props.onErrorInput) { return }
        this.props.onErrorInput(errorValue)
    }

    
    handleValue = value => {
        const { max, min } = this.props
        let resultValue = value === '' ? min : value
        // 此处不能使用 Math.max，会是字符串变数字，并丢失 .
        if (resultValue > max) {
        resultValue = max
        this.handleError({
            type: 'OVER',
            errorValue: resultValue,
        })
        }
        if (resultValue < min) {
        resultValue = min
        this.handleError({
            type: 'LOW',
            errorValue: resultValue,
        })
        }
        resultValue = parseValue(resultValue)
        return resultValue
    }


    public render(): JSX.Element {
        const {
            children,
            className,
            customStyle,
            name,
            cursorSpacing,
            confirmType,
            cursor,
            selectionStart,
            selectionEnd,
            adjustPosition,
            border,
            title,
            error,
            clear,
            placeholder,
            placeholderStyle,
            placeholderClass,
            autoFocus,
            focus,
            value,

            width,
            size,
            min,
            max,
            disabledInput
        } = this.props
        const {
            type,
            maxLength,
            disabled,
            password,
        } = getInputProps(this.props)
    
        const rootCls = classnames(
        'at-input',
        {
            'at-input--without-border': !border,
        }, className
        )
        const containerCls = classnames(
        'at-input__container',
        {
            'at-input--error': error,
            'at-input--disabled': disabled
        }
        )
        const overlayCls = classnames(
        'at-input__overlay',
        {
            'at-input__overlay--hidden': !disabled
        }
        )
        const placeholderCls = classnames('placeholder', placeholderClass)

        const inputStyle = {
        width: width ? `${Taro.pxTransform(width)}` : ''
        }
        const inputValue = this.handleValue(value)
        // const rootCls = classnames('at-input-number', {
        // 'at-input-number--lg': size
        // }, className)
        const minusBtnCls = classnames('at-input-number__btn', 'at-input-number__btn-minus', {
        'at-input-number--disabled': inputValue <= min || disabled
        })
        const plusBtnCls = classnames('at-input-number__btn', 'at-input-number__btn-plus', {
        'at-input-number--disabled': inputValue >= max || disabled
        })

        const hasChild = !_isEmpty(children)

        return (
            <View className={rootCls} style={customStyle}>
                <View className={containerCls}>
                    <View className={overlayCls} onClick={this.onClick}></View>
                    {title && <Label className='at-input__title' for={name}>{title}</Label>}
                    <View className='at-input-number'>
                        <View className={minusBtnCls} onClick={this.handleClick.bind(this, 'minus')}>
                            <Text className='at-icon at-icon-subtract at-input-number__btn-subtract'></Text>
                        </View>
                        <Input
                          className='at-input-number__input'
                          style={inputStyle}
                          type={type}
                          value={inputValue}
                          disabled={disabledInput || disabled}
                          onInput={this.handleInput}
                          onBlur={this.handleBlur}
                        />
                        <View className={plusBtnCls} onClick={this.handleClick.bind(this, 'plus')}>
                            <Text className='at-icon at-icon-add at-input-number__btn-add'></Text>
                        </View>
                    </View>
                    
                    {clear && value && (
                    <View className='at-input__icon' onTouchStart={this.clearValue}>
                        <Text className='at-icon at-icon-close-circle at-input__icon-close'></Text>
                    </View>
                    )}
                    {error && (
                    <View className='at-input__icon' onTouchStart={this.onErrorClick}>
                        <Text className='at-icon at-icon-alert-circle at-input__icon-alert'></Text>
                    </View>
                    )}
                    {
                        hasChild ? (<View className='at-input__children'>{children}</View>): null
                    }
                    
                </View>
                </View>
        );
    }
}


AtInputNumber.defaultProps = {
    customStyle: '',
    className: '',
    editable: true,
    disabled: false,
    disabledInput: false,
    value: 1,
    type: 'number',
    width: 0,
    min: 0,
    max: 100,
    step: 1,
    size: 'normal',
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
    onConfirm: () => {},
    onClick: () => {},
    onErrorClick: () => {},
  }
  
  AtInputNumber.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf(['number', 'digit']),
    disabled: PropTypes.bool,
    width: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    size: PropTypes.oneOf(['normal', 'large']),
    disabledInput: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onErrorInput: PropTypes.func,
    onFocus:  PropTypes.func,
    onConfirm:  PropTypes.func,
    onClick:  PropTypes.func,
    onErrorClick:  PropTypes.func,
  }

