package config

import "math"

// 获取破境所需经验
func getLevelUpExp(level uint) uint {
	// 返回当前100乘以（1.2乘以当前等级的次幂）
	return uint(100 * math.Pow(1.2, float64(level-1)))
}

// 破境 只有当前等级为10的倍数时（也就是突破大境界时），破境才有可能失败，否则必定成功（小境界成功率100%）
func LevelUp() bool {

	return true // 破镜成功
}
