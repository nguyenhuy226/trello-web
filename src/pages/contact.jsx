import React, { useState } from 'react'
import Field from '../components/Field'
import { regexp, required } from '../utils/Validate'
import { useForm } from '../hooks/useForm'

export default function ContactPage() {
    const {errors, values, register, validate} = useForm({
      name: [
          required('Xin vui lòng nhập họ và tên')
      ],
      email: [
          required('Xin vui lòng nhập email'),
          regexp('email', 'Xin vui lòng nhập đúng địa chỉ email')
      ],
      phone: [
          required('Xin vui lòng nhập số điện thoại'),
          regexp('phone', 'Xin vui lòng nhập đúng số điện thoại')
      ],
      website: [
          regexp ('url','Xin vui lòng nhập đúng địa chỉ của website')
      ], 
      title : [
        required('Xin vui lòng nhập tiêu đề')
      ],
      content: [
        required('Xin vui lòng nhập nội dung')
      ],
  })
    const onSubmit = () => {
        if(validate()) {
            console.log("validate thành công")
        } else {
            console.log('validate thất bại')
        }
    }

  return (
    <main id="main">
      <div className="register-course">
        <section className="section-1 wrap container">
          {/* <div class="main-sub-title">liên hệ</div> */}
          <h2 className="main-title">HỢP TÁC CÙNG Spacedev</h2>
          <p className="top-des">
            Đừng ngần ngại liên hệ với <strong>Spacedev</strong> để cùng nhau tạo
            ra những sản phẩm giá trị, cũng như việc hợp tác với các đối tác tuyển
            dụng và công ty trong và ngoài nước.
          </p>
          <div className="form" onSubmit={onSubmit}>
            <Field 
                label= 'Họ và tên'
                placeholder= 'Họ và tên'
                required
                {...register('name')}
            />
            <Field 
                label= 'Số điện thoại'
                placeholder= 'Số điện thoại'
                {...register('phone')}
            />
            <Field 
                label= 'Email'
                placeholder= 'Địa chỉ email'
                required
                {...register('email')}
            />
            <Field 
                placeholder= 'Địa chỉ website'
                label= 'Website'
                {...register('website')}
            />
            <Field 
                label= 'Tiêu đề'
                placeholder= 'Tiêu đề'
                required
                {...register('title')}
            />
            <Field 
                label= 'Nội dung'
                placeholder= 'Nội dung'
                required
                renderInput={(props) =>  <textarea {...props} cols={30} rows={10}/>}
                {...register('content')}
            />  
            <button onClick={onSubmit} className="btn main rect">đăng ký</button>
          </div>
        </section>
        {/* <div class="register-success">
            <div class="contain">
                <div class="main-title">đăng ký thành công</div>
                <p>
                    <strong>Chào mừng Vương Đặng đã trở thành thành viên mới của Spacedev Team.</strong> <br>
                    Cảm ơn bạn đã đăng ký khóa học tại <strong>Spacedev</strong>, chúng tôi sẽ chủ động liên lạc với bạn thông qua facebook
                    hoặc số điện thoại của bạn.
                </p>
            </div>
            <a href="/" class="btn main rect">về trang chủ</a>
        </div> */}
      </div>
    </main>
  )
}
