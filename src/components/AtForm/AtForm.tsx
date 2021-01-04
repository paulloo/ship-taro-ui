import Taro from '@tarojs/taro';
import PropTypes, {InferProps} from 'prop-types'
import { AtFormProps } from 'types/form'
import { View, Form } from '@tarojs/components';
import classnames from 'classnames';
import AtComponent from '../../common/component'

export default class AtForm extends AtComponent<AtFormProps> {

    static defaultProps = {
        customStyle: '',
        className: '',
        reportSubmit: () => {},
        onSubmit: () => {},
        onReset: () => {},
    }
    constructor(props: AtFormProps) {
        super(props);
        this.state = {
        };
    }
    
    onSubmit() {
        this.props.onSubmit(...arguments)
    }

    onReset() {
        this.props.onReset(...arguments)
    }
    public render(): JSX.Element {
        
        const {
            customStyle,
            className,
            reportSubmit
        } = this.props
        const rootCls = classnames('at-form', className)
        return (
            <Form
              className={rootCls}
              style={customStyle}
              onSubmit={this.onSubmit.bind(this)}
              reportSubmit={reportSubmit}
              onReset={this.onReset.bind(this)}
            >
                {this.props.children}
            </Form>
        );
    }
}



AtForm.defaultProps = {
    customStyle: '',
    className: '',
    reportSubmit: false,
    onSubmit: () => {},
    onReset: () => {}
  }
  
  AtForm.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    reportSubmit: PropTypes.bool,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func
  }
  