/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { klona } from 'klona'

/**
 * Define static properties on a class with inheritance in play.
 */
export function defineStaticProperty(
	self: any,
	BaseClass: any,
	{
		propertyName,
		defaultValue,
		strategy,
	}: {
		propertyName: string
		defaultValue: any
		strategy: 'inherit' | 'define'
	}
) {
	if (!self.hasOwnProperty(propertyName)) {
		/**
		 * Class is inhering the base class directly and hence we don't have to
		 * copy any properties
		 */
		if (Object.getPrototypeOf(self.prototype) === BaseClass.prototype || strategy === 'define') {
			Object.defineProperty(self, propertyName, { value: defaultValue })
			return
		}

		/**
		 * Class is inherting another sub class. We must copy the values to the self
		 * class, otherwise mutating them inside the self class will be reflected
		 * on the base class.
		 */
		const value = self[propertyName]
		if (value === undefined) {
			Object.defineProperty(self, propertyName, { value: defaultValue })
			return
		}

		Object.defineProperty(self, propertyName, { value: klona(value) })
	}
}