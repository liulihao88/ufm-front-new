import request from '@/utils/request.ts'

export function getDs() {
  return request({
    url: '/ds',
  })
}

export function getTaskDetails(nodeId, taskId) {
  return request({
    url: `/task/public/${taskId}`,
  })
}

export function previewChange(formData) {
  return request({
    url: `task/public/preview/change`,
    data: formData,
    method: 'put',
  })
}

// 保存
export function saveTaskPublic(formData) {
  return request({
    url: `task/public`,
    data: formData,
    method: 'put',
  })
}
