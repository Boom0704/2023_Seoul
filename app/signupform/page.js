"use client";
import { Button, Checkbox, Form, Input, Select, Option, message, Modal } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Encrypt from '@/components/Encrypt';
import { PlusOutlined } from '@ant-design/icons';

export default function SignUpForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const router = useRouter();

    // 회원가입 요청 보내기
    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response:', data);
        // 회원가입 완료 후 필요한 동작 수행
        // 예: 로그인 페이지로 이동
        router.push('/login');
      })
      .catch((error) => {
        console.error('Error:', error);
        // 에러 처리 로직 구현
      });
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };


  return (
    <div>
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: '형식이 올바르지 않은 이메일이에용!',
          },
          {
            required: true,
            message: '이메일을 입력해주세용!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: '비밀번호를 입력해주세용!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '비밀번호를 다시 확인해주세요!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('비밀번호가 맞지 않아용!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="name"
        label="Name"
        tooltip="성함을 적어주세요"
        rules={[
          {
            required: true,
            message: '성함을 입력해주세용!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('이용약관에 동의해주세요!')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          이용약관을 읽고 <a href="">동의해주세요!</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
}





