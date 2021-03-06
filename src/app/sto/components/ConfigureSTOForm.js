// @flow

import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { Form, Button, Tooltip } from 'carbon-components-react'
import {
  TextInput,
  SelectInput,
  DatePickerRangeInput,
  TimePicker,
  timeZoneName,
} from 'polymath-ui'
import {
  required,
  integer,
  twelveHourTime,
  dateRange,
  dateRangeTodayOrLater,
  gt,
} from 'polymath-ui/dist/validate'

export const formName = 'configure_sto'

type Props = {
  handleSubmit: () => void,
}

const defaultCurrency = 'POLY'

const gt0 = gt(0)

class ConfigureSTOForm extends Component<Props> {
  render () {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Field
          name='start-end'
          component={DatePickerRangeInput}
          label='Start Date;End Date'
          placeholder='mm/dd/yyyy'
          validate={[required, dateRange, dateRangeTodayOrLater]}
          style={{ width: '235px' }}
        />
        <div className='time-pickers-container'>
          <Field
            name='startTime'
            component={TimePicker}
            label='Start Time'
            validate={[twelveHourTime]}
          />
          <Field
            name='endTime'
            component={TimePicker}
            label={
              <Tooltip triggerText='End Time'>
                <p className='bx--tooltip__label'>
                  Start and End Times
                </p>
                <p>
                  Uses your local time zone, {timeZoneName()}.
                </p>
              </Tooltip>
            }
            validate={[twelveHourTime]}
          />
        </div>
        <Field
          name='currency'
          component={SelectInput}
          label='Raise in'
          placeholder='Choose a currency'
          options={[{ value: 'ETH', label: 'ETH' }, { value: 'POLY', label: 'POLY' }]}
          defaultValue={defaultCurrency}
        />
        <Field
          name='cap'
          component={TextInput}
          label={
            <Tooltip triggerText='Hard Cap (in Tokens)'>
              <p className='bx--tooltip__label'>
                Hard cap
              </p>
              <p>
                Hard cap is the maximum amount of funding you intend to raise in the currency you chose.
              </p>
            </Tooltip>
          }
          placeholder='Enter amount'
          validate={[required, integer, gt0]}
        />
        <Field
          name='rate'
          component={TextInput}
          label={
            <Tooltip triggerText='Rate'>
              <p className='bx--tooltip__label'>
                Rate
              </p>
              <p>
                Rate is the conversion rate between the currency you chose and your ST.
                E.g. 1000 means that 1 ETH (or POLY) will buy 1000 STs
              </p>
            </Tooltip>
          }
          placeholder='Enter amount'
          validate={[required, integer, gt0]}
        />
        <Button type='submit'>
          Confirm & Launch STO
        </Button>
      </Form>
    )
  }
}

export default reduxForm({
  form: formName,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    startTime: {
      timeString: '',
      dayPeriod: 'AM',
    },
    endTime: {
      timeString: '',
      dayPeriod: 'AM',
    },
  },
})(ConfigureSTOForm)
