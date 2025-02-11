import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, message, Upload } from 'antd'
import type { CheckboxGroupProps } from 'antd/es/checkbox'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'

const props: UploadProps = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text'
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }
}
const plainOptions: CheckboxGroupProps<string>['options'] = ['图片背景', '视频背景', '网址背景', '纯色背景']
const SetBgImg = () => {
  const [value1, setValue1] = useState('Apple')

  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio1 checked', value)
    setValue1(value)
  }
  return (
    <>
      <div className="flex">
        <div className="w-[100px]">背景设置</div>
        <div className="flex-1">
          <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />
          {value1 === '图片背景' && (
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>上传背景文件</Button>
            </Upload>
          )}
        </div>
      </div>
    </>
  )
}

SetBgImg.displayName = 'SetBgImg'
export default SetBgImg
