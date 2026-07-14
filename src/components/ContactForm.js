import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import PropTypes from 'prop-types'

const EMPTY = { fullName: '', phone: '', email: '', address: '', group: 'Bạn bè', notes: '' }

// Schema validate bằng Yup — kiến thức form validation chuẩn của FER202
const ContactSchema = Yup.object().shape({
  fullName: Yup.string().trim().required('Vui lòng nhập họ tên.'),
  phone: Yup.string()
    .trim()
    .required('Vui lòng nhập số điện thoại.')
    .matches(/^[0-9+\s-]{8,15}$/, 'Số điện thoại không hợp lệ.'),
  email: Yup.string().trim().email('Email không hợp lệ.'),
  address: Yup.string(),
  group: Yup.string(),
  notes: Yup.string(),
})

export default function ContactForm({ initialValue, onSubmit, submitLabel }) {
  return (
    <Formik
      initialValues={initialValue || EMPTY}
      validationSchema={ContactSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values)
        setSubmitting(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form className="ledger-form">
          <div className="form-row">
            <label htmlFor="fullName">Họ và tên *</label>
            <Field id="fullName" name="fullName" placeholder="Nguyễn Văn A" />
            <ErrorMessage name="fullName" component="span" className="field-error" />
          </div>

          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="phone">Số điện thoại *</label>
              <Field id="phone" name="phone" className="mono" placeholder="0901234567" />
              <ErrorMessage name="phone" component="span" className="field-error" />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" placeholder="ten@email.com" />
              <ErrorMessage name="email" component="span" className="field-error" />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="address">Địa chỉ</label>
            <Field id="address" name="address" placeholder="Số nhà, đường, quận/huyện, tỉnh/thành" />
          </div>

          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="group">Nhóm</label>
              <Field id="group" name="group" as="select">
                <option>Gia đình</option>
                <option>Bạn bè</option>
                <option>Công việc</option>
                <option>Khác</option>
              </Field>
            </div>
            <div className="form-row">
              <label htmlFor="notes">Ghi chú</label>
              <Field id="notes" name="notes" placeholder="Sinh nhật, sở thích..." />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Đang lưu...' : submitLabel}
          </button>
        </Form>
      )}
    </Formik>
  )
}

ContactForm.propTypes = {
  initialValue: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
}
